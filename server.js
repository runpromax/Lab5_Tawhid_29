console.log("yes, This is connected");
const express = require("express");
const path= require("path");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie_info",
});
db.connect((err)=>{
    if (err) {
        console.log(err)
    }
    else {
        console.log("Connected Successfully")
    }
})

app.get("/movie",(req, res)=>{
    const query= "select * from movie";
    db.query(query,(err, results)=>{
        if (err) {
            console.log(err);

        }
        else {
            res.json(results);
        }
    });
});

app.get("/",(req, res) =>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log('Server is running on 3000');
}) 