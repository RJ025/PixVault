import client from '@/db'
import brcypt from 'bcryptjs'


export async function POST(request : Request) {

    try {
        const {email , name , password , profilePic}  = await request.json()

        const checkExistingUser = await client.user.findFirst({
            where : {
                email
            }
        })

        if(checkExistingUser) {
            return Response.json(
                {
                success: false,
                message: 'Email is already registered',
                },
                { status: 400 }
            );
        }

        const hashedPassword = await brcypt.hash(password , 10);

        const newUser = await client.user.create({
            data : {
                email,
                name,
                password : hashedPassword,
                profilePic : profilePic || ""
            }
        })

        return Response.json({
            success : true,
            message : 'user created successfully',
            newUser
        } , {status : 200})

    } catch (err) {
        return Response.json({
            success : false,
            message : 'Error signing up'
        } , {status : 400})
    }
    
}