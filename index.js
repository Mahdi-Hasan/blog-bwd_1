const express = require('express');
const bodyParser = require('body-parser');
const app  = express();
const ejs = require('ejs')

const db = require('./db')
const port = 5000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let posts = [];

function homePage(req, res){
    res.sendFile(__dirname + '/home.html')
}

async function postBlog(req, res){
    const post = {
        title: req.body.title,
        content: req.body.content
        }

    let postInsertQuery = "INSERT INTO post (Title, Content) VALUES (?,?)"
    const [result] = await db.execute(postInsertQuery, [post.title, post.content])
    res.redirect("/");
}

async function getPosts(req, res){
    const [dbPosts] =await db.execute(" SELECT * FROM post")
    res.render( 'post', {data: dbPosts})
}

function userPage(req, res){
    res.sendFile(__dirname+ '/user.html')
}

async function addUser(req, res){
    const user = {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        }

    let userInsertQuery = "INSERT INTO user (name, email, country) VALUES (?,?, ?)"
    const [result] = await db.execute(userInsertQuery, [user.name, user.email, user.country])
    res.redirect("/users");
}

app.get('/', getPosts)
app.get('/blog', homePage)
app.post('/blog', postBlog)

app.get('/user', userPage)
app.post('/user', addUser)

app.listen(port,() => {
    console.log(`Server is running on ${port}...`)
} )