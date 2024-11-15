import CredentialsProvider from "next-auth/providers/credentials"
import client from "@/db"
import { NextAuthOptions }  from "next-auth"
import bcrypt from "bcryptjs"
import { PrismaAdapter } from "@auth/prisma-adapter"



export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id : "credentials",
            name : "Credentials",
            credentials : {
                email : {label : "Email" , placeholder : "Email" , type : "text"},
                password : {label : "Password" , placeholder : "Password" , type : 'password'}
            } ,
            async authorize (credentials:any) : Promise<any> {
                try {
                    const user = await client.user.findFirst({
                        where : {
                            email : credentials.email
                        }
                    })

                    if(!user) {
                        throw new Error('No User Found with this Email')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password , user.password)

                    if(isPasswordCorrect) {
                        console.log(user)
                        return user
                    } else {
                        throw new Error('Incorrect Password')
                    }
                } catch(err : any) {
                    throw new Error(err)
                }
            }
        })
    ] ,
    callbacks : {
        async jwt ({token , user }) {

            if(user) {
                console.log('user found setting token')
                token._id = user.id?.toString(),
                token.email = user.email,
                token.name = user.name 
            }
            console.log('token created' , token)
            return token
        } ,
        async session ({session , token} : {token : any , session : any}) {
            if(token) {
                session.user._id = token._id  ,
                session.user.email = token.email ,
                session.user.name = token.name
            }
            return session
        }
    },
    pages : { 
        signIn : '/login'
    },
    session : {
        strategy : "jwt"
    },
    // adapter : PrismaAdapter(client),
    secret : process.env.AUTH_SECRET
}