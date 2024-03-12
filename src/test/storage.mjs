import { get } from "http";
import { getProducts } from "../modules/data.mjs";


// getProducts().then(products => console.log(products))

const getData = async () => {
  let products = await getProducts()

  return products
}