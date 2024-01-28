import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try {
        const prisma = new PrismaClient();
        const result = await prisma.categories.findMany({
            select: {id:true, name: true}
        });       

        return NextResponse.json({status: 'success', data: result})
        
    } catch (error) {
        return NextResponse.json({status:'fail', data: error})
    }
}


export async function POST(req, res){
    try {
        let reqBody = await req.json();
        let prisma = new PrismaClient();

        const result = await prisma.categories.create({data: reqBody});
        return NextResponse.json({status: 'success', data: result});
        
    } catch (error) {
        return NextResponse.json({status: 'fail', data: error})
    }
}