import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res){
    try {
        let reqBody = await req.json();
        let prisma = new PrismaClient();
        const result = await prisma.subscribers.create({
            data:reqBody
        });
        return NextResponse.json({status: 'success', data: result});
        
    } catch (error) {
        return NextResponse.json({status: 'fail', data: error})
    }
}