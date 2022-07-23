const express = require('express');
const mysql = require('mysql');
const app = express();
const pool = require('./dbPool.js');

app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
app.get("/dbTest", async function(req, res){
    let sql = "SELECT * FROM q_quotes";
    let rows = await executeSQL(sql);
    res.send(rows);
});
app.get("/", (req, res) => {
    res.render("index");
});

app.get('/searchByKeyword', async (req, res) => {
   let userKeyword = req.query.keyword;
   console.log(userKeyword);
   let sql = `SELECT quote, authorId, firstName, lastName FROM q_quotes NATURAL JOIN q_authors WHERE quote LIKE ?`;
    let params = [`%${userKeyword}%`];

   let rows = await executeSQL(sql, params);
   res.render("results", {"quotes": rows});

});

//functions
async function executeSQL(sql, params){
    return new Promise (function(resolve, reject) {
        pool.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}


//start server
app.listen(3000, () => {
    console.log("Express server running...")
} )
