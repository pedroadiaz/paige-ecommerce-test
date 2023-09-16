import { NextResponse } from "next/server";
import { IProduct } from "app/interfaces/product";
import { Products } from "app/data/products";

export async function GET(request: Request, 
    { params }: {
        params: { sku: string }
    }) {
        const products = new Products();
        const product = products.GetProductById(params.sku);
        if (!product) {
            return NextResponse.json({
                message: "Invalid SKU"
                },
                {
                    status: 404
                }
            );
        }
        return NextResponse.json(product);
}


export async function PUT(request: Request, 
    { params }: {
        params: { sku: string }
    }) {
        const updated = await request.json() as IProduct;
        const products = new Products();
        const product = products.UpdateProduct(params.sku, updated);
        if (product) {
            return NextResponse.json(product);
        } else {
            return NextResponse.json({
                message: "Invalid SKU"
                },
                {
                    status: 404
                }
            );
        }
}


export async function DELETE(request: Request, 
    { params }: {
        params: { sku: string }
    }) {
        const products = new Products();
        const successful = products.DeleteProductById(params.sku);
        if (!successful) {
            return NextResponse.json({
                message: "Invalid SKU"
                },
                {
                    status: 404
                }
            );
        }
        
        return NextResponse.json({ message: `Product with sku ${params.sku} deleted successfully`});
}
