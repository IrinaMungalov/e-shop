// const products = [
//     { name: "Some Product 1", price: 100 },
//     { name: "Another Product 2", price: 200 },
//     { name: "Product 3", price: 3000 },
// ]










import {readFile, writeFile} from 'node:fs/promises'

const getProducts = async () => {
    let data = await readFile("./storage/products.json")
    let products = JSON.parse(data.toString())

    return products;
}

const getProductById = async id => (await getProducts()).find(product => product.id === id);


const getCart = async () => {
    let data = await readFile("./storage/cart.json")
    let cart = JSON.parse(data.toString())

    return cart
}

const saveOrder = async (order) => {
    let data = await readFile("./storage/orders.json");
    let orders = JSON.parse(data.toString());
    orders.push(order);
    data = JSON.stringify(orders,null,2);
    writeFile("./storage/orders.json", data);
}










const saveCart = async (cart) => {
    await writeFile("./storage/cart.json", JSON.stringify(cart, null, 2) );
    return true
}


// packing
export { getProducts, saveCart,  getProductById, getCart, saveOrder };
