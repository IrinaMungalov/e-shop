import { get } from "http";
import { getProducts } from "../modules/data.mjs";


getProducts( (products) => {console.log(products)})