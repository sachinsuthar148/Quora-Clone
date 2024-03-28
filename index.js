let express = require('express');
let app=express();
let port=3000;
const path=require('path');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require("body-parser");
const methodOVerride= require('method-override');


app.use(methodOVerride('_method'));
app.set("view engine","ejs");
app.use(bodyParser.json());
app.set("views",path.join(__dirname,"/views"));
app.use(express.static("public"));


app.use(express.urlencoded({extended:true}));



let posts=[
    {
        id: uuidv4(),
        username:"sachin suthar",
        content:"Hello everyone my name is sachin",
    },
    {
        id: uuidv4(),
        username:"divya suthar",
        content:"Hello everyone my name is divya",
    },
    {
        id: uuidv4(),
        username:"kavita suthar",
        content:"Hello everyone my name is kavita",
    },
]


// let posts=[];

app.get("/posts",(req,res)=>
{
    res.render("index.ejs",{posts});
});



app.get("/posts/new",(req,res)=>{
    res.render("show.ejs");
})


app.post("/posts",(req,res)=>{
    // console.log(req.body);
    let {username,content}=req.body;
    // res.send("post api is working");
posts.push({id:uuidv4(),username:username,content:content});
    res.redirect("/posts");
});


app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id===p.id);
    console.log(id);
    console.log(post);
    // res.send("request working");
    res.render("post.ejs",{post});

})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id === p.id);

    res.render("edit.ejs",{post});
    // res.send("edit api is working");
})


app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts= posts.filter((p)=> id !== p.id);
    // res.send("delete sucess");
    res.redirect("/posts");
})


app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    console.log(newContent);
    let post = posts.find((p)=> id === p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.listen(port, ()=>{
    console.log("port is listening");
});