import express from 'express';
import  ProductManager  from '../src2/src/managers/ProductManager.js';
import  CartManager  from '../src2/src/managers/CartManager.js';
import routerCarts from '../src2/routes/carts.router.js';
import routerProducts from '../src2/routes/products.router.js';

const app = express();
const port = 8080;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const pathCarts = './data/carts.json';

export const productManager = new ProductManager(pathProducts);
export const cartManager = new CartManager(pathCarts);

app.use('/api/products', routerProducts);
app.use("/api/carts", routerCarts);


app.listen(8080, () => console.log("servidor con express"));