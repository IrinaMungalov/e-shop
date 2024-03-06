// const products = [
//     { name: "Some Product 1", price: 100 },
//     { name: "Another Product 2", price: 200 },
//     { name: "Product 3", price: 3000 },
// ]










import {readFile} from 'node:fs/promises'







const getProducts = () => {
    return readFile("./storage/products.json")
      .then(data => {
        let products = JSON.parse(data.toString());
        return products
      })      
      .catch(err => {
        console.log("Error: cannot read products!");
      })    
}



























const cart = {
    items: []
}

// packing
export { getProducts, cart };
