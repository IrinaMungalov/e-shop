import {readFile} from 'node:fs/promises'
import {JSDOM} from 'jsdom'

let data = 'This is some SAMPLE DATA'

let template =  await readFile('./template.html')
let temptale_str = template.toString()

// console.log(temptale_str)

let dom = new JSDOM (temptale_str) 
let { window } = dom
let { document } = window

let h2 = document.createElement('h2')
h2.innerHTML = data

document.body.append(h2)

console.log(dom.serialize())