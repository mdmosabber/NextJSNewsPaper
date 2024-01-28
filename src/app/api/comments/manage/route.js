import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try {
        let headerList = headers();
        let id = parseInt(headerList.get('id'));

        const prisma = new PrismaClient();
        const result = await prisma.comments.findMany({
            where: {userId: id},
            include: {
                news_list: {select: {title:true}}
            }
        })

        return NextResponse.json({status: 'success', data: result})
        
    } catch (error) {
        return NextResponse.json({status:'fail', data: error})
    }
}



export async function POST(req, res){
    try {
        let headerList = headers();
        let id = parseInt(headerList.get('id'));

        let reqBody = await req.json();
        reqBody.userId = id;

        const prisma = new PrismaClient();
        const result = await prisma.comments.create({
            data:reqBody
        })


        return NextResponse.json({status: "success", data: result})

    } catch (error) {
    
        return NextResponse.json({status: 'fail', data:error})
    }
}



export async function DELETE(req, res){
    try {
        let headerList = headers();
        let user_id = parseInt(headerList.get('id'));

        let reqBody = await req.json();

        const prisma = new PrismaClient();
        const result = await prisma.comments.deleteMany({
            where: {
                AND: [
                    {userId: user_id},
                    {id: parseInt(reqBody['id'])},
                ],
            },
        })

        return NextResponse.json({status:"success",data:result});

    } catch (error) {
        return NextResponse.json({status: 'fail', data:error})
    }
}