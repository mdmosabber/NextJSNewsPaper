
import { SendEmail } from "@/utility/EmailUtility";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try {
        const prisma = new PrismaClient();
        const {searchParams} = new URL(req.url);
        let email = searchParams.get('email');

        const count = await prisma.users.count({
            where:{email:email}
        });

        if(count === 1){
            let code = Math.floor(100000 + Math.random() * 900000);
            let EmailText = `Your OTP code is ${code}`;
            let EmailSubject = "Next News Verification Code";
            
            await SendEmail(email,EmailText,EmailSubject);

            let result = await prisma.users.update({
                where:{email:email},
                data: {otp: code.toString() }
            })

            return  NextResponse.json({status:"success",data:"6 Digit OTP Code has been sent to your email"})

        }else{
            return  NextResponse.json({status:"fail", data:"No user found"});
        }
        
    } catch (error) {
        return NextResponse.json({status: 'fail', data: error})
    }
}