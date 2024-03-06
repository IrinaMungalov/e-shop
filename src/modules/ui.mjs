import readline from 'readline'
// destructuring
import {cart, getProducts} from './data.mjs'

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const renderMainMenu = () => {
    console.clear()    
    let renderLine = () => {
        let line = '='.repeat(30)
        console.log(`${line}\nMAIN MENU\n${line}`)
        console.log("1. Catalog")
        console.log("2. Cart")
        console.log("0. Exit")
    } 
    renderLine()

    io.question("choose > ", answer => {
        let option = parseInt(answer)
        switch (option) {
          case 1:

          getProducts((products)=>{
              renderCatalog(products, (n, product, q) => {
                  cart.items.push({ n, product, q });
                  renderMainMenu();
              });

          })
            
            break;
          case 2:
            renderCart(cart)
            break;

          case 0:
            io.close();
            break;
        }
    })
}

const renderCart = (cart) => {
    console.clear()   
    let line = "=".repeat(30); 
    let renderLine = () => {        
        console.log(`${line}\nCART\n${line}`)
    } 
    renderLine()

    cart.items.forEach((item, idx) => {
      const index = (idx + 1).toString().padStart(2);
      const name = item.product.name.padEnd(20);
      const q = item.q.toString().padEnd(4);

      console.log(index, name, q);
    });

    console.log(`${line}`)   
    console.log("1. Remove item")
    console.log("2. Change quantity")
    console.log("3. Checkout")
    console.log("0. Exit to Main menu")
    

    io.question("choose > ", (answer) => {
      let option = parseInt(answer);
      switch (option) {
        case 1:
            removeItem(cart)
          break;
        case 2:
            changeQuantity(cart)
          break;

        case 3:
          break;

        case 0:
          getProducts((products) => {
              renderCatalog(products, (n, product, q) => {
                  cart.items.push({ n, product, q });
                  renderMainMenu();
              });
          });
          break;
      }
    });

}

const removeItem = (cart) => {
    io.question("Remove a position > ", (answer) => {
      let position = parseInt(answer)
      cart.items.splice(position - 1, 1)
      renderCart(cart)
    })
}

const changeQuantity = (cart) => {
    io.question("Enter the item position to change the quantity: ", (positionAnswer) => {
        let position = parseInt(positionAnswer)

        io.question("Enter a new quantity: ", (qAnswer) => {
          let newQ = parseInt(qAnswer)
          cart.items[position - 1].q = newQ
          renderCart(cart)
        })
    })
}


const renderCatalog = (products, confirmCb) => {
    console.clear()
    // HW2:
    let line = "=".repeat(30)
    let renderLine = () => {
        
        console.log(`${line}\nCATALOG\n${line}`)
    } 

    renderLine()

    // console.log("==============================")
    // console.log("CATALOG")
    // console.log("==============================")

    products.forEach( (product,idx) => {
        // HW1: align columns (JS)
        const index = (idx+1).toString().padStart(2)
        const name  = product.name.padEnd(20)       
        const price = product.price.toString().padEnd(4)

        console.log(index, name, price)
    })
    
    console.log(`${line}`)
    console.log("0. Exit to Main menu")

    io.question("choose > ", answer => {
        let n = parseInt(answer)

        if (n === 0) {
          renderMainMenu()
          return 
        }

        // HW3: check if you've got a number !
        if ( n < 1 || n > products.length || isNaN(n) ) {

          console.log("Incorrect input. Enter a number from 1 to " + products.length)
          io.close()          
        } 

        let product = products[n - 1]
        io.question(`how many "${product.name}": ? `, (answer) => {
        let q = parseInt(answer)

        // HW3: check if you've got a number !
        // ...
        if ( isNaN(q) ) {

            console.log("Incorrect input. Please enter a number.")
            io.close()            
        }

        let cost = q * product.price;
        io.question(`product cost "${cost}": confirm (y/n)? `, (answer) => {
            
            switch (answer) {
            case "y":
                confirmCb(n, product, q);
                break;
            case "n":
                console.log(`product "${product.name}" was not confirmed!`);
                break;
            default:
                console.log("Invalid option");
                break;
            }
            
            })
        })
    })      
       
}


export { renderCatalog, renderMainMenu, renderCart, removeItem, changeQuantity }