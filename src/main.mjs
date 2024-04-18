import http from 'node:http'
import querystring from 'node:querystring'

import { getProducts, getProductById, saveOrder, confirmOrder } from './modules/data.mjs'
import { render } from './modules/template.mjs'
import { readFile } from 'node:fs/promises'

import { v4 as uuid } from 'uuid'

import  stripeMod from 'stripe'
const stripe = stripeMod("sk_test_51OyYdtRvub0WjYy799UX8CjG69NBQedhNbVTRqv0db5Akhxxr64H7rGbdWxMOdnmD2iQwtwiMSbSLtsawwmiRH2H00FLI4zyg1");


const server = http.createServer(async (req,res) => {

    res.setHeader("Content-type", "text/html")

    let html

    if (req.url === "/") {       

        const products = await getProducts();
        html = await render("./pages/home.html", { products: products });
        
    } else if (req.url.startsWith("/images")) {

        html = await readFile(`.${req.url}`)
        
    } else if (req.url.startsWith("/buy")) {
      // let id = parseInt(req.url.split("/").pop())

      // HW2*: what if "/buy?id=1"
      // let id = parseInt(req.url.match(/\/buy\?id=(\d+)/)[1])      

      // HW1: try to use regexp capture
      let id = parseInt(req.url.match(/\/buy\/(\d+)/)[1]);
      let product = await getProductById(id);
      html = await render("./pages/order.html", { product: product });
    
      
    } else if (req.url.startsWith("/pay")) {
      // PAYMENT //////////////////////////////////

      let parameters = req.url.split("?");
      let data = querystring.parse(parameters[1]);
      
      data.id = uuid();
      data.payed = false;
      data.productId = parseInt(data.productId);

      if (data.agreeTerms == "on") {
        await saveOrder(data);
        
      } else {
        html = "You must agree to the terms!";
      }

      let product = await getProductById(data.productId);
      
      // working with stripe
      const productStripe = await stripe.products.create({
        name: product.name,
      });

      const price = await stripe.prices.create({
        currency: product.price_currency,
        unit_amount: product.price_amount * 100, // 10.00$
        product: productStripe.id,
      });

      const paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        after_completion: {
          redirect: {
            url: `http://localhost:3000/confirm?id=${data.id}`,
          },
          type: "redirect"
        },
      });

      html = `You will be redirected to stripe in 3 seconds, otherwise click  <a href="${paymentLink.url}">here</a>`;
      res.setHeader("Refresh", `3; URL=${paymentLink.url}`);
      // PAYMENT //////////////////////////////////
   
    } else if (req.url.startsWith("/confirm")) {
      let parameters = req.url.split("?");
      let {id} = querystring.parse(parameters[1])
      await confirmOrder(id)
      // HW: show a payment succes / order places message
      html = `<h1>Payment Successful!</h1>
              <p>Your order has been successfully placed. Thank you for your purchase!</p>
              <p><a href="/">Home</a></p>
            `;
    } else {
      html = `Oops, not found ;(`
      res.statusCode = 404
    } 

    res.end(html)
} )


server.listen("3000", "localhost")

