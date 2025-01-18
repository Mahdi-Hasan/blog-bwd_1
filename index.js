const express = require('express');
const bodyParser = require('body-parser');
const app  = express();
const ejs = require('ejs')
const port = 5000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let posts = [];

function homePage(req, res){
    res.sendFile(__dirname + '/home.html')
}

function postBlog(req, res){
    const post = {
        title: req.body.title,
        post: req.body.post
        }
    posts.push(post);
    res.redirect("/");
}

function getPosts(req, res){
    res.render( 'post', {data: posts})
}
app.get('/', getPosts)
app.get('/blog', homePage)
app.post('/blog', postBlog)

app.listen(port,() => {
    console.log(`Server is running on ${port}...`)
} )