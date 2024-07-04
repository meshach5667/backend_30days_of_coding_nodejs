// callback,promisess andAsync/Await

//callback

function fetchDataCallback(callback){
    setTimeout(()=>{ // setTimeout simulates an asyncronous operation with a 2 second delay
        const data = {namee: "Obed Meshach", age: 99};
        callback(data);//called the provided calback function with fecth data

    },2000);
}

function handleData(data)//function to handle recieved data 
{
    console.log(" Data Recieved :", data, "=","callback")
}

fetchDataCallback(handleData);


//Promise

function fetchDataPromise() {
    return new Promise ((resolve, rejecet) =>{ //return a new promise
        setTimeout(()=>{
            const data = {
                name:"Obed Meshach",
                age:99
            }
            resolve(data); ///resolve promise with fetch
        },2000);
    })
    
}

fetchDataPromise() // use promise to handle fetchdata
.then((data)=> {
    console.log("Data Recieved:",data,"=","Promise")
})
.catch((error) =>{
    console.error("Error:",error);
})
    


//Async/Await

function fetchdataAsync() {
    
    return new Promise ((resolve, rejecet) =>{ //return a new promise
        setTimeout(()=>{
            const data = {
                name:"Obed Meshach",
                age:99
            }
            resolve(data); //resolve promise with fetch
        },2000);
    })
    
}
async function handleDataAsync() {
    try {
        const data = await fetchdataAsync();
        console.log("Data recieved:", data,"=","Async/Await");
    } catch (error) {
        console.error("Error", error);
    }
    
}

handleDataAsync();