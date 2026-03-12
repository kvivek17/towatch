import clientPromise from "@/lib/mongo";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
    const user = await currentUser()

    const client = await clientPromise;
    const db =await client.db('Towatch')
    const collection = await db.collection('user')

    try {
        const users = await collection.findOne({email:user.primaryEmailAddress.emailAddress})
        console.log("Clerk user object:", users);

        if(!users){
            const createuser = await collection.insertOne({
                 name:user.fullName,
                email:user.primaryEmailAddress.emailAddress,
            })

            return NextResponse.json({message:"user create sucessfully"})

        }
        return NextResponse.json({message:"user already exist" ,user:users})
    } catch (error) {
        console.log(error);
        
    }


    
}