import { Table, TableContainer, Paper, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { IProduct } from '../interfaces/product';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { FilterColorButton } from 'app/components/filter-color-button';

export default async function Index() {
  const results = await fetch("http://localhost:4200/api/products", {
    cache: "no-cache"
  });

  const json = await results.json();

  const products = json as IProduct[];
  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {products && products.map((product: IProduct) => (
                <TableRow key={product.sku+product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.color}</TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>${(Math.round(product.price * 100) / 100).toFixed(2)}</TableCell>
                    <TableCell>
                        <Link href={`/product-detail/${product.sku}`}><Button variant="contained" style={{ margin: "10px" }}>View Detail</Button></Link>
                        <FilterColorButton ></FilterColorButton>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}
