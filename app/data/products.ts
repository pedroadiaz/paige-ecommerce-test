import { IProduct } from "app/interfaces/product";
import products from '../../_data/products.json'

export class Products {
    private static Products: IProduct[];

    constructor() {
        if (!Products.Products) {
            Products.Products = products;
        }
    }

    public GetAllProducts(): IProduct[] {
        return Products.Products;
    }

    public GetProductById(sku: string): IProduct | undefined {
        const index = Products.Products.findIndex(p => p.sku === sku );
        if (index <= -1) {
            return undefined;
        }
        return Products.Products[index];
    }

    public DeleteProductById(sku: string): boolean {
        const index = Products.Products.findIndex(p => p.sku === sku );
        if (index <= -1) {
            return false;
        }
        Products.Products.splice(index, 1);

        return true;
    }

    public UpdateProduct(sku: string, updated: IProduct): IProduct | undefined {
        const index = Products.Products.findIndex(p => p.sku === sku );
        if (index <= -1) {
            return undefined;
        }
        
        Products.Products[index] = updated;

        return Products.Products[index];
    }
}
