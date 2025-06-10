import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
const signUpSchema = z.object({
  email:z.string().email(message:"invalid email"),
  password:z.string().min(10,"pass must be 10 char"),
  confirmPassword:z.string()
}).refine(data => data.password === data.confirmPassword,{
  message:"password must match",
  path:["password"]
})
const App = () => {
const {
  register,
  handleSubmit,
  formState:{errors,isSubmitting},
  reset
} = useForm({
  resolver: zodResolver(signUpSchema)
})

const onSubmit = async(data) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  reset();
}
 
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit(onSubmit)} className="w-100" style={{maxWidth:"400px"}} >
        <input 
        {...register("email")}
        className="form-control mb-2"
        placeholder="Email" 
        type="email"/>
        {errors.email && ( <p className="text-danger">{errors.email.message}<p/>)}
        <input 
        {...register("password")}
        className="form-control mb-2"
        placeholder="Password" 
        type="password"/>
        {errors.password && ( <p className="text-danger">{errors.password.message}<p/>)}
        <input 
        {...register(confirmPassword)}
        className="form-control mb-2"
        placeholder="Confirm Password" 
        type="password"/>
        {errors.confirmPassword && ( <p className="text-danger">{errors.confirmPassword.message}<p/>)}

        <button 
        disabled = {isSubmitting}
        type="submit"
        className="btn btn-primary w-100" >Submit</button>
      </form>
    </div>
  )
}

export default App
