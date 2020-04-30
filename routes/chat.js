const express = require("express");
const router = express.Router();
const con = require("../config/mySQL");

router.get(`/add-chat-box`, (req, res) => {    
    const checker = false
    const sql1 = `SELECT * FROM chatbox`
    con.query(sql1, (err, result) => {
        for(var i in result){   
            if(result[i].userId == req.query.userId && result[i].friendId == req.query.friendId){
                console.log("FOUND")
                return res.send({add : false})   
            }            
        } 
        const sql = `INSERT INTO chatbox (userId, friendId) VALUES (${req.query.userId}, ${req.query.friendId})`
        con.query(sql, (err, result) => {
        return res.send({add : true})
        })                
    })
})

router.get('/get-read-message', (req, res) => {    
    const chatId = req.query.friendId + "_" + req.query.userId
    const sql = `UPDATE message SET state="read" WHERE chatId='${chatId}'`
    con.query(sql, (err, result) => {
        console.log(result)
    })
})

router.get(`/get-chat-box`, (req, res) => {
    const sql = `SELECT chatbox.id, users.userId, users.firstname, users.lastname, users.token FROM chatbox INNER JOIN users ON chatbox.friendId=users.userId WHERE chatbox.userId=${req.query.userId}`    
    con.query(sql, (err, result) => {
        return res.send(result)
    })
})

router.get('/get-read', (req, res) => {
    const chatId = req.query.friendId + "_" + req.query.userId
    const sql = `SELECT state from message WHERE chatId='${chatId}'`
    con.query(sql, (err, result) => {
        return res.send(result)
    })
})

router.get(`/find-friend`, (req, res) => {
    const sql = `SELECT * FROM users WHERE userId=${req.query.friendId}`
    con.query(sql, (err, result) => {
        return res.send(result)
    })
})

router.get(`/delete-chat-room`, (req, res) =>{
    const sql = `DELETE FROM chatbox WHERE id=${req.query.chatId}`
    con.query(sql, (err, result) => {
        return res.send({delete : true})
    })
})

router.get('/send-message', (req, res) => {  
    const chatId = req.query.userId + "_" + req.query.friendId  
    const sql = `INSERT INTO message (chatId, toMessage) VALUES ('${chatId}', '${req.query.message}')`
    con.query(sql, (err, result) => {
        return res.send({send : true})
    })
})

router.get('/read-message', (req, res) => {
    const chatId = req.query.userId + "_" + req.query.friendId    
    const chatIdFriend = req.query.friendId + "_" + req.query.userId 
    const sql = `SELECT * FROM message WHERE chatId='${chatId}' OR chatId='${chatIdFriend}'`
    con.query(sql, (err, result) => {        
        return res.send(result)
    })
})


module.exports = router;
