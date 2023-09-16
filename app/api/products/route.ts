import { NextResponse } from "next/server";
import { Products } from "app/data/products";

export async function GET(request: Request) {
  const products = new Products();
  return NextResponse.json(products.GetAllProducts());
}
