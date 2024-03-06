import { stat } from 'node:fs'

const fileExists = (path, cb) => {
    stat(path, (err,stats) => {
        if (err) {
            console.log(err)
        } else if (stats) {
            cb(stats)
        }      
    })
}


//-----------------------------------
fileExists(
    './examples/data.txt',
    stats => {
        console.log("file exists!")
    }
)