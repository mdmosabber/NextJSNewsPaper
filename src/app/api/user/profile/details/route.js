import { NextResponse } from "next/server";
import {headers} from "next/headers";
import { PrismaClient } from "@prisma/client";

export async function GET(req, res){
    try {
        let headerList = headers();
        let id = parseInt( headerList.get('id') );

        const prisma = new PrismaClient();
        const result = await prisma.users.findUnique({
            where:{id:id}
        });
        
        return NextResponse.json({status: 'success', data: result});        
    } catch (error) {
      return NextResponse.json({status: 'fail', data:error})  
    }
} 