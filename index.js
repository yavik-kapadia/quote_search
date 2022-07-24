const express = require('express');
const app = express();
const pool = require('./dbPool.js');

app.set("view engine", "ejs");
app.use(express.static('public'));

//routes
app.get("/dbTest", async function (req, res) {
    let sql = "SELECT * FROM q_quotes";
    let rows = await executeSQL(sql);
    res.send(rows);
});
app.get("/", async (req, res) => {
    let sql = `SELECT authorID, firstName, lastName
               FROM q_authors
               ORDER BY lastName`;
    let rows = await executeSQL(sql);

    sql = `SELECT DISTINCT category FROM q_quotes `;
    let category = await executeSQL(sql);
    res.render("index", {authors: rows, categories: category});

});

app.get('/searchByKeyword', async (req, res) => {
    let userKeyword = req.query.keyword;
    console.log(userKeyword);
    let sql = `SELECT quote, authorId, firstName, lastName
               FROM q_quotes
                        NATURAL JOIN q_authors
               WHERE quote LIKE ?`;
    let params = [`%${userKeyword}%`];

    let rows = await executeSQL(sql, params);
    res.render("results", {"quotes": rows});

});

app.get('/searchByAuthor', async (req, res) => {

    let userAuthorId = req.query.authorId;
    console.log(userAuthorId);
    let sql = `SELECT quote, authorId, firstName, lastName FROM q_quotes NATURAL JOIN q_authors WHERE authorId = ?`;
    let params = [userAuthorId];
    let rows = await executeSQL(sql, params);
    res.render("results", {"quotes": rows});
});

//search by range of likes
app.get('/searchByLikes', async (req, res) => {
    let userMinLikes = req.query.minLikes;
    let userMaxLikes = req.query.maxLikes;
    let sql = `SELECT quote, authorId, firstName, lastName FROM q_quotes NATURAL JOIN q_authors WHERE likes ? between ?`;
    let params = [parseInt(userMinLikes), parseInt(userMaxLikes)];
    let rows = await executeSQL(sql, params);
    res.render("results", {"quotes": rows});
});

app.get('/api/author/:id', async (req, res) => {
    let authorId = req.params.id;
    let sql = `SELECT *
            FROM q_authors
            WHERE authorId = ? `;
    let rows = await executeSQL(sql, [authorId]);
    res.send(rows)
});

app.get('/searchByCategory', async (req, res) => {
    let userCategory = req.query.category;
    console.log(userCategory);
    let sql = `SELECT quote, authorId, firstName, lastName
               FROM q_quotes
                        NATURAL JOIN q_authors
               WHERE category = ?`;
    let params = [userCategory];

    let rows = await executeSQL(sql, params);
    res.render("results", {"quotes": rows});
});

//functions
async function executeSQL(sql, params) {
    return new Promise(function (resolve, reject) {
        pool.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}


//start server
app.listen(3000, () => {
    console.log("Express server running...")
});

