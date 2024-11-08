// rafce
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email!!!" }),
    password: z.string().min(8, { message: "Password ต้องมากกว่า 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password มันบ่ตรงกันเด้อ",
    path: ["confirmPassword"],
  });

const Register = () => {
  // Javascript
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });



  const onSubmit = async (data) => {
    const passwordScore = zxcvbn(data.password).score
    console.log(passwordScore)
    if(passwordScore<3){
      toast.warning('Password บ่ Strong!!!!!')
      return
    }
    console.log('ok ลูกพี่')
    // Send to Back
    try {
      const res = await axios.post("http://localhost:5001/api/register", data);

      console.log(res.data);
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  return (
    <div>
      Register
      <form onSubmit={handleSubmit(onSubmit)}>
        Email
        <input {...register("email")} className="border" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        Password
        <input {...register("password")} className="border" />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        Confirm Password
        <input {...register("confirmPassword")} className="border" />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <button className="bg-blue-500 rounded-md">Register</button>
      </form>
    </div>
  );
};

export default Register;
