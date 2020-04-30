const express = require("express");
const router = express.Router();
const con = require("../config/mySQL");

router.get("/add-friend", (req ,res) =>{
    if(req.query){
        const sql = `INSERT INTO friend (userId,friendId,state) VALUES (${req.query.userId}, ${req.query.friendId}, "add")`
        con.query(sql, (err, result) =>{
            if(err) throw err
            if(result){
                return res.send({add : true})
            }
        })
    }
})

router.get("/check-user-add", (req, res) =>{
    const { userId, friendId} =  req.query
    // console.log(userId)
    // console.log(friendId)
    const sql = `SELECT * FROM friend WHERE userId=${userId} AND friendId=${friendId}`
    con.query(sql, (err, result) => {
        for(var i in result){
            if(result[i].state == 'add'){
                return res.send({add : true})
            }
        }
    })
})

router.post("/friend-list", (req, res) =>{
    const sql = `select * from users`;
    // const sql = `select users.userId, users.firstname, users.lastname, friend.friendId, friend.state, friend.resId from users left join friend on users.userId=friend.userId where friend.userId=${req.body.userId} or users.userId!=${req.body.userId}`
    con.query(sql, (err, result) => {
        // console.log("-------------------------------------------------------")
        // console.log(result)
        const data = []
        // console.log("-------------------------------------------------------")
        for(var i in result){
            if(result[i].userId != req.body.userId){
                data.push(result[i])
            }
        }
        // console.log("-------------------------------------------------------")
        return res.send(data)
    })
    
})



//cancel friend request
router.get("/cancel-friend", (req,res) =>{
    const sql = `DELETE FROM friend WHERE userId=${req.query.userId} AND friendId=${req.query.friendId}`
    con.query(sql, (err, result) =>{
        if(result){
            return res.send({cancel : true})
        }
    })
})

//friend request
router.get("/friend-request", (req, res) =>{
    const sql = `SELECT users.userId, users.firstname, users.lastname, users.token, friend.state, friend.friendId FROM friend INNER JOIN users ON friend.userID=users.userId WHERE friendId='${req.query.userId}' AND state='add'`
    con.query(sql, (err, result) =>{
        if(result){
            return res.send(result)
        }
    })
})

//confirm request
router.get("/confirm-request", (req, res) =>{
    const sql =`UPDATE friend SET state="friend" WHERE userId=${req.query.friendId} AND friendId=${req.query.userId}`
    con.query(sql, (err, result) =>{
        return res.send({confirm : true})
    })
})

//get my friend
router.get("/myfriend", (req, res) =>{
    const sql = `SELECT users.userId, users.firstname, users.lastname, friend.resId, friend.state, users.token, users.profileurl FROM friend INNER JOIN users ON friend.userId=users.userID WHERE state='friend' AND friendId=${req.query.userId}`
    con.query(sql, (err, result) => {
        if(result){
            return res.send(result)
        }
    })
})

router.get("/myfriendme", (req, res) =>{
    const sql = `SELECT users.userId, users.profileurl, users.firstname, users.lastname, friend.resId, friend.state, users.token FROM friend INNER JOIN users ON friend.friendId=users.userID WHERE friend.userId=${req.query.userId} AND friend.state='friend'`  
    con.query(sql, (err, result) => {
        if(result){
            return res.send(result)
        }
    })
})

//delete friend
router.get("/delete-friend", (req, res) =>{
    const sql = `DELETE FROM friend WHERE resId=${req.query.resId}`
    con.query(sql, (err, result) =>{
        if(result){
            return res.send({delete : true})
        }
    })
})


module.exports = router;
