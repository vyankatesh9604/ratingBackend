const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const userRoutes=require('./Routes/userRoutes')
app.use(express.json())

dotenv.config({ path: "./config.env" })

const db = process.env.DATABASE_URI.replace('<password>',process.env.DATABASE_PASSWORD)
const options={
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
} 
mongoose.connect(db,options).then(()=> {
    console.log("Database connected sucessfully")
}).catch((err)=>{
    console.log(err)
}) 
app.use('/users',userRoutes)

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Hello from server"
    })
})
const PORT =process.env.PORT ||  5000 

app.listen(PORT,() => {
    console.log("Sucessfully started ")
})