const { Console } = require("node:console");
const fs = require("node:fs");

fs.readFile("logFile.txt","utf-8",(error, data) =>{

    if (error) {
        console.log(error);
        
    }
    else{
        console.log(data)

    }
} )
// i appended I just wrote to the file to my logFile.txt
fs.writeFile("logFile.txt", "I just wrote to this file",  {flag:"a"},(err) => { 
    if (err) {
        console.log(err)


        
    }

    else{
        console.log("File written.")
    }

})