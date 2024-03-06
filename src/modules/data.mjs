// const products = [
//     { name: "Some Product 1", price: 100 },
//     { name: "Another Product 2", price: 200 },
//     { name: "Product 3", price: 3000 },
// ]










import fs from 'node:fs'


const getProducts = (cb) => {

    fs.readFile("./storage/products.json", (err,data)=> {
        if (err !== null) {
            console.log("Error: cannot read products!")
        } else if (data) {
            let products = JSON.parse(data.toString())
            cb(products)
        }       
    })
}



























const cart = {
    items: []
}

// packing
export { getProducts, cart };
