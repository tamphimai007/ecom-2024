// rafce
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'


const Uploadfile = ({ form, setForm }) => {
    // Javascript
    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)
    const handleOnChange = (e) => {
        // code
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images  // [] empty array
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                // Validate
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} บ่แม่นรูป`)
                    continue
                }
                // Image Resize 
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint Backend
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                toast.success('Upload image Sucess!!!')
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    },
                    "base64"
                )


            }
        }
    }
    return (
        <div>
            <input
                onChange={handleOnChange}
                type='file'
                name='images'
                multiple
            />
        </div>
    )
}

export default Uploadfile