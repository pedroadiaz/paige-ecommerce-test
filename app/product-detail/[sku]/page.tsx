"use client"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IProduct } from '../../interfaces/product';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function ProductDetail({ params }) {
    const [product, setProduct] = useState<IProduct>();
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const router = useRouter();

    useEffect(()=> {
        getDetail(params.sku).then(p => {
            setProduct(p);
            setName(p.name);
            setType(p.type);
            setDescription(p.description);
            setColor(p.color);
            setPrice(p.price);
        });
    }, [])

    const onSubmit = (event: FormEvent<HTMLFormElement>)  => {
        try {
            event.preventDefault();
            const updatedProduct: IProduct = {
                id: product.id,
                sku: product.sku,
                name: name,
                type: type,
                description: description,
                color: color,
                price: price
            };
    
            fetch(`http://localhost:4200/api/products/${product.sku}`, {
                method: "PUT",
                body: JSON.stringify(updatedProduct)
            }).then(response => response.json())
            .then(json => {
                console.log("response from server: ", json);
                router.push("/product-list");
            });
        } catch (error) {
            localStorage.setItem("lastError", error.message);
            console.log(error);
        }       
    }
  return (
    <Box sx={style}>
                <form onSubmit={onSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Product Detail
                    </Typography>
                    <div style={{padding: "10px"}}>
                        Name:<input 
                            name="name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            style={{ margin: "10px", border: "1px"}}
                            />
                    </div>
                    <div style={{padding: "10px"}}>
                        Type:<input 
                            name="type"
                            maxLength={56}
                            value={type}
                            onChange={(e)=> setType(e.target.value)}
                            style={{ margin: "10px"}}
                            />
                    </div>
                    <div style={{padding: "10px"}}>
                        Description:<input 
                            name="description"
                            maxLength={56}
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            style={{ margin: "10px"}}
                            />
                    </div>
                    <div style={{padding: "10px"}}>
                        Color:<input 
                            name="color"
                            maxLength={56}
                            value={color}
                            onChange={(e)=> setColor(e.target.value)}
                            style={{ margin: "10px"}}
                            />
                    </div>
                    <div style={{padding: "10px"}}>
                        Price:<input 
                            name="price"
                            type="number"
                            min={0}
                            step={0.01}
                            value={price}
                            onChange={(e)=> setPrice(Number.parseFloat(e.target.value))}
                            style={{ margin: "10px"}}
                            />
                    </div>
                    <Button
                        variant="contained"
                        type="submit"
                        style={{ margin: "10px"}}
                    >Save</Button>
                </form>
            </Box>
  );
}


const getDetail = async (sku: string): Promise<IProduct | null> => {
    const result = await fetch(`http://localhost:4200/api/products/${sku}`);

    const json = await result.json();

    return json as IProduct;
}