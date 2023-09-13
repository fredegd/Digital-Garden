const mongoose=require('mongoose')

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=> {
    console.log('Connected to Database')
   
}).catch((error)=>{
    console.log('Error connecting to Database',error)
});
