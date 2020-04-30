const express = require("express");
const router = express.Router();
const con = require("../config/mySQL");
const moment = require('moment');

//LIST OF ALL POST
router.get("/posts", (req, res) => {});

//Create a new post
router.post("/posts", (req, res) => {
    const sql = `INSERT INTO post (activity_title, userId, total_distance, totalTime,  pace_average, description, photo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const Data = [req.body.data, req.body.userId, req.body.totalDistance, req.body.totalTime, req.body.paceAverage, req.body.description, req.body.postPhoto ]
    const value = Object.values(Data)
    con.query(sql, value, (err, result) =>{
        if(err) throw err
        return res.send({post : true})
    })
});

//get user post
router.post("/get-post", (req, res) =>{
    const sql = `SELECT post.postId, users.firstname, users.lastname, users.profileurl, post.total_distance, post.activity_title, post.description, post.pace_average, post.userId, post.totalTime, users.token, post.photo FROM post INNER JOIN users ON post.userId=users.userId WHERE post.userId=${req.body.userId}`
    con.query(sql, (err, result) => {
        return res.send(result)
    })
})

//get all post
router.get('/get-all-post', (req, res) =>{
    const sql = `SELECT post.postId, post.photo, post.totalTime, users.firstname, users.lastname, users.profileurl, post.total_distance, post.activity_title, post.description, post.pace_average, post.userId, users.token FROM post INNER JOIN users ON post.userId=users.userId`
    con.query(sql, (err, result) =>{
        return res.send(result)
    })
})

//delete post
router.get('/delete-post', (req, res) => {
    const {postId} = req.query
    const sql = `DELETE FROM post WHERE postId=${postId}`
    con.query(sql, (err, result) => {
        return res.send({delete : true})
    })
})

//post comment
router.post("/post-comment", (req, res) =>{
    const sql = `INSERT INTO comments (userId, postId, content) VALUES ('${req.body.userId}', '${req.body.postId}', '${req.body.content}')`
    con.query(sql, (err, result) =>{
        return res.send({comment : true})
    })
})

//get comment
router.post("/get-comment", (req, res) =>{
    const sql = `SELECT comments.commentId, comments.content, users.profileurl, users.firstname, users.lastname, users.token FROM comments INNER JOIN users ON comments.userId=users.userId WHERE postId='${req.body.postId}'`
    // const sql = `SELECT * FROM comments WHERE postId='${req.body.postId}'`
    con.query(sql, (err, result) =>{
        return res.send(result)
    })
})
    
//Like post --update like in post
router.post("/post-like", (req, res) =>{
    if(req.body.userId != "" && req.body.posId != ""){
        const sql = `INSERT INTO postLike (postId, userId) VALUES ('${req.body.postId}', '${req.body.userId}')`
        con.query( sql, (err, result) =>{
            return res.send({like : true})
        })
    }
})

//delete like
router.post("/delete-like", (req, res) =>{
    if(req.body.userId != "" && req.body.posId != ""){
        const sql = `DELETE FROM postLike WHERE postId=${req.body.postId} AND userId=${req.body.userId}`
        con.query(sql, (err, result) =>{
            if(result) { return res.send({unlike : true}) }
        })
    }
})

//get like
router.get("/get-like", (req, res) =>{
    if(req.query.userId != "" && req.query.posId != ""){
        const sql = `SELECT * FROM postLike WHERE postId=${req.query.postId} AND userId=${req.query.userId}`
        con.query(sql, (err, result) =>{
            for(var i in result){
                return res.send({like : true})
            }
        })
    }
})

//get user like
router.post("/get-user-like", (req, res) =>{
    if(req.body.postId){
        const sql = `SELECT postLike.postId, users.firstname, users.lastname, users.userId, users.token FROM postLike INNER JOIN users ON postLike.userId=users.userId WHERE postId=${req.body.postId}`
        con.query(sql, (err, result) => {
            if(result){
                return res.send(result)
            }
        })
    }
})


router.post("/upload-album", (req, res) => {
    console.log(req.body)
    const sql = `INSERT INTO Albumname (userId, albumname) VALUES (${req.body.userId}, '${req.body.name}')`
    con.query(sql, (err, result) => {        
        if(result){
            return res.send({add : true})
        }
    })
})

router.post("/upload-phto-album", (req, res) => {
    console.log(req.body)
    const sql = `INSERT INTO photoalbum (userId, albumname, url) VALUES (${req.body.userId}, '${req.body.name}', '${req.body.url}')`
    con.query(sql, (err, result) => {
        if(result){
            return res.send({add : true})
        }        
    })
})

router.post("/get-album/:id", (req, res) => {
    let userId = req.params.id;
    console.log(userId)
    const sql = `SELECT * FROM Albumname WHERE userId=${userId}`
    con.query(sql, (err, result) => {
        console.log(result)
        return res.send(result)
    })
})

router.post("/get-photo-album/:id/:name", (req, res) => {
    let userId = req.params.id
    let name = req.params.name
    console.log(userId)
    console.log(name)
    const sql = `SELECT * FROM photoalbum WHERE userId=${userId} AND albumname='${name}'`
    con.query(sql, (err, result) => {
        console.log(result)
        if(result){
            return res.send(result)
        }
    })
})

module.exports = router;
