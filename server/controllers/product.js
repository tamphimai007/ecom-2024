const prisma = require("../config/prisma")
const cloudinary = require('cloudinary').v2;


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



exports.create = async (req, res) => {
    try {
        // รับค่าจาก body
        const { title, description, price, quantity, categoryId, images } = req.body;

        // สร้าง Product โดยใช้ Prisma
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: categoryId ? String(categoryId) : null, // categoryId ต้องเป็น String
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url,
                    })),
                },
            },
        });

        // ส่งข้อมูล Product ที่สร้างกลับไป
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.list = async (req, res) => {
    try {
        const { count } = req.params;
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.read = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findFirst({
            where: {
                id: String(id), // แก้จาก Number เป็น String
            },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.update = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body;

        await prisma.image.deleteMany({
            where: {
                productId: String(req.params.id), // แก้จาก Number เป็น String
            },
        });

        const product = await prisma.product.update({
            where: {
                id: String(req.params.id), // แก้จาก Number เป็น String
            },
            data: {
                title,
                description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: categoryId ? String(categoryId) : null, // แปลง categoryId เป็น String
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url,
                    })),
                },
            },
        });
        res.send(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findFirst({
            where: { id: String(id) }, // แก้จาก Number เป็น String
            include: { images: true },
        });

        if (!product) {
            return res.status(400).json({ message: "Product not found!!" });
        }

        const deletedImage = product.images.map(
            (image) =>
                new Promise((resolve, reject) => {
                    cloudinary.uploader.destroy(image.public_id, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    });
                })
        );
        await Promise.all(deletedImage);

        await prisma.product.delete({
            where: {
                id: String(id), // แก้จาก Number เป็น String
            },
        });

        res.send("Deleted Success");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.listby = async (req, res) => {
    try {
        const { sort, order, limit } = req.body;
        const products = await prisma.product.findMany({
            take: parseInt(limit),
            orderBy: { [sort]: order },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                    mode: "insensitive", // ทำให้การค้นหาไม่คำนึงถึงตัวพิมพ์ใหญ่-เล็ก
                },
            },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Search Error" });
    }
};

const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: parseFloat(priceRange[0]),
                    lte: parseFloat(priceRange[1]),
                },
            },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

const handleCategory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => String(id)), // แปลงเป็น String
                },
            },
            include: {
                category: true,
                images: true,
            },
        });
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.searchFilters = async (req, res) => {
    try {
        const { query, category, price } = req.body;

        if (query) {
            console.log("query -->", query);
            await handleQuery(req, res, query);
        }
        if (category) {
            console.log("category -->", category);
            await handleCategory(req, res, category);
        }
        if (price) {
            console.log("price -->", price);
            await handlePrice(req, res, price);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.createImages = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `Roitai-${Date.now()}`,
            resource_type: "auto",
            folder: "Ecom2024",
        });
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.removeImage = async (req, res) => {
    try {
        const { public_id } = req.body;
        cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Failed to remove image" });
            }
            res.send("Remove Image Success!!!");
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
