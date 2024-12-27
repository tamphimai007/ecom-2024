const prisma = require("../config/prisma");

exports.listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    const user = await prisma.user.update({
      where: { id: String(id) }, // เปลี่ยนเป็น String
      data: { enabled },
    });
    res.send("Update Status Success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    const user = await prisma.user.update({
      where: { id: String(id) }, // เปลี่ยนเป็น String
      data: { role },
    });
    res.send("Update Role Success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await prisma.user.findFirst({
      where: { id: String(req.user.id) }, // เปลี่ยนเป็น String
    });

    for (const item of cart) {
      const product = await prisma.product.findUnique({
        where: { id: String(item.id) }, // เปลี่ยนเป็น String
        select: { quantity: true, title: true },
      });

      if (!product || item.count > product.quantity) {
        return res.status(400).json({
          ok: false,
          message: `ขออภัย. สินค้า ${product?.title || "product"} หมด`,
        });
      }
    }

    await prisma.productOnCart.deleteMany({
      where: {
        cart: { orderedById: String(user.id) },
      },
    });

    await prisma.cart.deleteMany({
      where: { orderedById: String(user.id) },
    });

    const products = cart.map((item) => ({
      productId: String(item.id),
      count: item.count,
      price: item.price,
    }));

    const cartTotal = products.reduce((sum, item) => sum + item.price * item.count, 0);

    const newCart = await prisma.cart.create({
      data: {
        products: { create: products },
        cartTotal,
        orderedById: String(user.id),
      },
    });
    res.send("Add Cart Ok");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { orderedById: String(req.user.id) },
      include: {
        products: {
          include: { product: true },
        },
      },
    });

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    res.json({
      products: cart.products,
      cartTotal: cart.cartTotal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { orderedById: String(req.user.id) },
    });

    if (!cart) {
      return res.status(400).json({ message: "No cart" });
    }

    await prisma.productOnCart.deleteMany({
      where: { cartId: String(cart.id) },
    });

    const result = await prisma.cart.deleteMany({
      where: { orderedById: String(req.user.id) },
    });

    res.json({
      message: "Cart Empty Success",
      deletedCount: result.count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: String(req.user.id) },
      data: { address },
    });

    res.json({ ok: true, message: "Address update success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.saveOrder = async (req, res) => {
  try {
    const { id, amount, status, currency } = req.body.paymentIntent;

    const userCart = await prisma.cart.findFirst({
      where: { orderedById: String(req.user.id) },
      include: { products: true },
    });

    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ ok: false, message: "Cart is Empty" });
    }

    const order = await prisma.order.create({
      data: {
        products: {
          create: userCart.products.map((item) => ({
            productId: String(item.productId),
            count: item.count,
            price: item.price,
          })),
        },
        orderedById: String(req.user.id),
        cartTotal: userCart.cartTotal,
        stripePaymentId: id,
        amount: Number(amount) / 100,
        status,
        currentcy: currency,
      },
    });

    await Promise.all(
      userCart.products.map((item) =>
        prisma.product.update({
          where: { id: String(item.productId) },
          data: {
            quantity: { decrement: item.count },
            sold: { increment: item.count },
          },
        })
      )
    );

    await prisma.cart.deleteMany({
      where: { orderedById: String(req.user.id) },
    });

    res.json({ ok: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { orderedById: String(req.user.id) }, // เปลี่ยนจาก Number เป็น String
      include: {
        products: {
          include: {
            product: true, // รวมข้อมูลสินค้าที่เกี่ยวข้อง
          },
        },
      },
    });

    if (!orders || orders.length === 0) {
      return res.status(400).json({ ok: false, message: "No orders" });
    }

    res.json({ ok: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

