import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'

const signUpSchema = z.object({
email: z.string().email({message:"Invalid Email"}),
password: z.string().min(10,"Password mu be 10 characters"),
confirmPassword: z.string()
}).refine( data => data.password === data.confirmPassword, {
  message:"Password must match",
  path:["confirmPassword"]
})
const App = () => {
  const {
    register,
    handleSubmit,
    formState:{errors,isSubmitting},
    reset,
  } = useForm({
    resolver:zodResolver(signUpSchema)
  })
  const onSubmit = async() => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    reset()
  }
  return (
    <div className="d-flex flex-column gap-5 align-items-center justify-content-center vh-100 bg-light">
      <form onSubmit={handleSubmit(onSubmit)} className="w-100" style={{maxWidth:"400px"}} >
        <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        />

        {errors.email && (<p className="text-danger" >{errors.email.message}</p>)}
        <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="form-control mb-2"
        />
        {errors.password && (<p className="text-danger" >{errors.password.message}</p>)}

        <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className="form-control mb-2"
        />
        {errors.confirmPassword && (<p className="text-danger" >{errors.confirmPassword.message}</p>)}

        <button
        disabled={isSubmitting}
        className="btn btn-primary w-100" >Submit</button>
      </form>
            <Link to="/fetch" className="btn btn-primary btn-sm">fetch</Link>    

    </div>
  )
}

export default App
