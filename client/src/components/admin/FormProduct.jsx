// rafce
import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'




const initialState = {
    title: "Core i7",
    description: "desc",
    price: 200,
    quantity: 20,
    categoryId: '',
    images: []
}
const FormProduct = () => {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    // console.log(products)

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        // code
        getCategory(token)
        getProduct(token, 20)
    }, [])


    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            console.log(res)
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1>เพิ่มข้อมูลสินค้า</h1>
                <input
                    className='border'
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='Title'
                    name='title'
                />
                <input
                    className='border'
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='Description'
                    name='description'
                />
                <input
                    type='number'
                    className='border'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='price'
                    name='price'
                />
                <input
                    type='number'
                    className='border'
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='quantity'
                    name='quantity'
                />
                <select
                    className='border'
                    name='categoryId'
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr />
                {/* Upload file  */}
                <Uploadfile form={form} setForm={setForm} />

                <button className='bg-blue-500'>เพิ่มสินค้า</button>


                <hr />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">ชื่อสินค้า</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">จำนวนที่ขายได้</th>
                            <th scope="col">วันที่อัปเดต</th>
                            <th scope="col">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.sold}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <p>แก้ไข</p>
                                            <p>ลบ</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </table>

            </form>
        </div>
    )
}

export default FormProduct