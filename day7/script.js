const fs = require('fs');
const path = require('path');


const myDirectoryPath = '/home/meshach/ethersjs'; 
const outputFilePath = '/home/meshach/ethersjs/package.json'


function myDirectoryContents() {
  fs.readdir(myDirectoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to to GET directory contents: ' + err);
    }
    
    const fileContents = files.join('\n');

    fs.writeFile(outputFilePath, fileContents, (err) => {
      if (err) {
        return console.log('Error writing to file: ' + err);
      }
      console.log('Directory contents written to ' + outputFilePath); //which is ../package.json
    });
  });
}

myDirectoryContents();
