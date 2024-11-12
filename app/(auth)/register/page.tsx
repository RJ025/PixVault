'use client'

import axios from "axios";
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";


export default function Register () {

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [name , setName] = useState("");
  const [profilePic , setProfilePic] = useState("")
  const router = useRouter()
  console.log(profilePic)

  const handleRegister = async () => {

    try {
      const response = await axios.post("http://localhost:3000/api/register" , {
        email ,
        name,
        password,
        profilePic
      })

      if (response.status === 200) {
        console.log(response);
        router.push('/dashboard')
      }

      const data = response.data;
      console.log(data);
    } catch(err : any) {
      if (err.response && err.response.data && err.response.data.message) {
        console.error(err.response.data.message);
      } else {
        console.error("Something went wrong. Please try again.");
      }
    }
    
  }

    return (
   <div
     className="bg-no-repeat bg-cover bg-center relative"
   >
     <div className="absolute" />
     <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
       <div className="flex self-center z-10">
         <div className="p-12 mx-auto rounded-2xl w-100 shadow-xl">
           <div className="mb-4">
             <h3 className="font-semibold text-2xl text-gray-800">Register </h3>
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
                 onChange={(e)=>setEmail(e.target.value)}
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
                 onChange={(e)=>setPassword(e.target.value)}
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-gray-700 tracking-wide">
                 Confirm Password
               </label>
               <input
                 className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                 type=""
                 placeholder="Retype password"
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-gray-700 tracking-wide">
                 Name
               </label>
               <input
                 className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                 type="text"
                 placeholder="Jhon Doe"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-gray-700 tracking-wide">
                 Profile Picture
               </label>
               <input
                 className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-black"
                 type="file"
                 value={profilePic}
                 onChange={(e) => setProfilePic(e.target.value)}
               />
             </div>
             <div className="flex items-center justify-between">
               <div className="flex items-center">
                 <input
                   id="remember_me"
                   name="remember_me"
                   type="checkbox"
                   className="h-4 w-4   "
                 />
                 <label
                   htmlFor="remember_me"
                   className="ml-2 block text-sm text-gray-800"
                 >
                   Remember me
                 </label>
               </div>
             </div>
             <div>
               <button 
                 type="submit"
                 className="w-full flex justify-center hover:bg-black hover:text-white text-black p-3 rounded-full tracking-wide font-semibold cursor-pointer border-2 border-black"
                 onClick={()=>handleRegister()}
               >
                 Register
               </button>
             </div>
             <div className="text-center text-sm">  
             <p>Already Registered!</p>
             <Link href="/login" className="text-gray-400 hover:text-black font-semibold">Login Here</Link>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
    )
   }