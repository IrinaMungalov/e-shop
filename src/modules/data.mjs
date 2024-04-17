// const products = [
//     { name: "Some Product 1", price: 100 },
//     { name: "Another Product 2", price: 200 },
//     { name: "Product 3", price: 3000 },
// ]










// import {readFile, writeFile} from 'node:fs/promises'


import postgres from "postgres";
const sql = postgres(
  "postgres://postgres:qazwsx@localhost:10000/e_shop_db",
  {}
);

const getProducts = async () => {
    let products = await sql`SELECT * FROM products;`
    return products
}

const getProductById = async (id) => (await sql`SELECT * FROM products WHERE id = ${id};`).shift();


const saveOrder = async (order) => {
    await sql`INSERT INTO orders (
        id, productId, fullName, emailAddress, phoneNumber
    ) VALUES (${order.id}, ${order.productId}, ${order.fullName}, ${order.emailAddress}, ${order.phoneNumber})`;
}

const confirmOrder = async (id) => {
  await sql`UPDATE orders SET payed = true WHERE id = ${id};`;
};       











const getCart = async () => {
  let data = await readFile("./storage/cart.json");
  let cart = JSON.parse(data.toString());

  return cart;
};


const saveCart = async (cart) => {
    await writeFile("./storage/cart.json", JSON.stringify(cart, null, 2) );
    return true
}


// packing
export { getProducts, saveCart,  getProductById, getCart, saveOrder, confirmOrder };
