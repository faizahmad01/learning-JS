const express = require("express")
const app = express()

app.get("/" , (req, res)=>{
    res.send("Hello Dada!")
})

app.listen(3000, ()=>{console.log("App started on port 3000")})