'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Login() {

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const router = useRouter()

  // useEffect(() => {
  //   async function fetchSession() {
  //     const session = await getSession();
  //     console.log(session);
  //   }
  //   fetchSession()
  // } ,[])

  const handleSignIn = async() => {
    try {
        const res = await signIn('credentials' , {
          email ,
          password ,
          redirect : true,
        })

        if(res?.status === 200) {
          console.log(res);
          // router.push('/dashboard')
        }
    } catch(err : any) {
      if (err.response && err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
      } else {
        console.error("Something went wrong. Please try again.");
      }
    }
    
  }

 return (
<div className="bg-no-repeat bg-cover bg-center relative">
  <div className="absolute"/>
  <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
    <div className="flex self-center z-10">
      <div className="p-12 mx-auto rounded-2xl w-100 shadow-xl">
        <div className="mb-4">
          <h3 className="font-semibold text-2xl text-gray-800">Login </h3>
          <p className="text-gray-500">Please login to your account.</p>
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 tracking-wide">
              Email
            </label>
            <input
              className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type="text"
              placeholder="mail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="mb-5 text-sm font-semibold text-gray-700 tracking-wide">
              Password
            </label>
            <input
              className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-800"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm font-semibold">
              <a href="#" className="text-gray-400 hover:text-black ">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button 
              type="submit"
              className="w-full flex justify-center hover:bg-black hover:text-white text-black p-3 rounded-full tracking-wide font-semibold cursor-pointer border-2 border-black"
              onClick={() => handleSignIn()}
            >
              Sign in
            </button>
          </div>
          <div className="text-center text-sm">
            <p>Don't Have an account?</p>
            <Link href="/register" className="text-gray-400 hover:text-black font-semibold"> Register Here</Link>
          </div>
        </div>
        <div className="pt-5 text-center text-gray-400 text-xs">
        </div>
      </div>
    </div>
  </div>
</div>
 )
}