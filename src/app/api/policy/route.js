import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try {       
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');

        const prisma = new PrismaClient();
        const result = await prisma.policies.findMany({
            where:{type: type}
        })

        return NextResponse.json({status: 'succcess', data: result})

    } catch (error) {
        return NextResponse.json({status: 'fail', data: error})
    }
}


export async function POST(req, res){
    try {
        let reqBody = await req.json();
        let prisma = new PrismaClient();
         
        const result = await prisma.policies.create({data: reqBody});
    
        return NextResponse.json({status: 'success', data: result});
        
    } catch (error) {
        return NextResponse.json({status: 'fail', data: error})
    }
}