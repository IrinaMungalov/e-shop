import postgres from "postgres";

const sql = postgres('postgres://postgres:qazwsx@localhost:10000/e_shop_db', {})

const products = await sql`SELECT * FROM products;`

products.forEach( product => console.log(product))