import { stat } from 'node:fs/promises'

const fileExists = (path) => {    
    return stat(path)
        .then(stats => {
            return true
        })
        
}


//-----------------------------------
fileExists("./examples/data.txt")
    .then( exists => console.log(exists) )

