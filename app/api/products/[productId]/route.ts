import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {productId: string}}) {
    try {
        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }


        const existingProduct = await prisma.product.findUnique({
            where: {
                id: params.productId
            }
        });

        if (!existingProduct) {
            return new NextResponse("Product not found", { status: 404 });
        }

        const product = await prisma.product.findUnique({
            where: {
              id: params.productId
            }
          });

          return NextResponse.json(product);

    } catch(error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {productId: string}}) {
    try {
        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const existingProduct = await prisma.product.findUnique({
            where: {
                id: params.productId
            }
        });
        
        if (!existingProduct) {
            return new NextResponse("Product not found", { status: 404 });
        }
        const deletedProduct = await prisma.product.delete({
            where: {
                id: params.productId
            },
        });
        
        return new NextResponse(null, { status: 200 });
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}
