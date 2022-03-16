const express = require("express");
const app = express();
const port = 8000;

let books = require("./books.json");
app.use(express.json())

//middleware
const req_api = (req,resp,next) =>{
    req.name = "sanu";
    next();
}


app.get("/",req_api, (req, resp)=>{
    const obj ={
        "api_requested_by":req.name,
        "books":books
    }
    resp.json(obj)

})
app.post("/books", (req, resp) => {
    //console.log(req.body);
    books.push(req.body)
    resp.json(books)
})
app.get("/books/:id",req_api, (req, resp)=> {
    const {id} = req.params
    const book = books.find((book) => book.id === parseInt(id));
    const obj ={
        "api_requested_by":req.name,
        "book":book
    }
    resp.json(obj)
})
app.patch("/books/:id", (req, resp)=> {
    const {id} = req.params
    const book = books.find((book) => book.id === parseInt(id));
    book.author = req.body.author
    book.year = req.body.year
    resp.json(book)
})
app.delete("/books/:id", (req, resp)=> {
    const {id} = req.params
    books = books.filter((book) => book.id !== parseInt(id));
    resp.json(books)
})

app.listen(port,()=>{
    console.log("success")
})


