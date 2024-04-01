import http from 'node:http'
import { getProducts, getProductById } from './modules/data.mjs'
import { render } from './modules/template.mjs'
import { readFile } from 'node:fs/promises'


const server = http.createServer(async (req,res) => {

    res.setHeader("Content-type", "text/html")

    let html

    if (req.url === "/") {       

        const products = await getProducts();
        html = await render("./pages/home.html", { products: products });
        
    } else if (req.url.startsWith("/images")) {

        html = await readFile(`.${req.url}`)
        
    } else if (req.url.startsWith("/buy")) {
        // "/buy/1"

        // let id = parseInt(req.url.split("/").pop())

        // HW2*: what if "/buy?id=1"

        // let id = parseInt(req.url.match(/\/buy\?id=(\d+)/)[1])

        // HW3: add a checkbox "i agree with terms"
        //      check of it is checked - server side           

            // HW1: try to use regexp capture
            let id = parseInt(req.url.match(/\/buy\/(\d+)/)[1]);
            let product = await getProductById(id);
            html = await render("./pages/order.html", { product: product });
        
        
      
    } else {

        html = `Oops, not found ;(`
        res.statusCode = 404
    } 

    res.end(html)
} )


server.listen("3000", "localhost")

