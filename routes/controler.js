
module.exports = {
    conn: null,
    app: null,
    init: function (conn, app, bodyParser) {
        this.conn = conn;
        this.app = app;
        this.index();
        this.createTable();
        this.addComment(conn, app, bodyParser);
        this.showComment(conn);
        this.deleteComment(conn, app, bodyParser);
    },
    index: function () {
        this.app.get('/', function (req, res) {
            res.render("index.html");
        });

    },
    createTable: function () {

        var createTable = "CREATE TABLE IF NOT EXISTS `comments` ( "
                + " `ID` bigint(20) NOT NULL AUTO_INCREMENT,"
                + " `post_ID` bigint(20) DEFAULT NULL,"
                + " `author` tinytext,"
                + " `email` varchar(100) DEFAULT NULL,"
                + " `date` datetime DEFAULT NULL,"
                + " `content` text,"
                + " `approved` varchar(20) DEFAULT NULL,"
                + " `parent` bigint(20) DEFAULT NULL,"
                + " PRIMARY KEY (`ID`)"
                + " ) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";

        this.conn.query(createTable, function (err, result) {
            if (err) {
                console.log("comments table not created..");
            }
        });
    },
    addComment: function (conn, app, bodyParser) {
        app.use(bodyParser.urlencoded({extended: false}));
        app.post('/insert', function (req, res) {

            var insertCommentData = {post_ID: 10, author: req.body.nm, email: req.body.email, content: req.body.comment, approved: 0, parent: 0};
            var query = conn.query('INSERT INTO comments SET ?', insertCommentData, function (err, result) {
                if (err) {
                    console.log("comment  not inserted..");
                }
                else {
                    res.send("Thank you");
                }
            });
        });
    },
    showComment: function (conn) {

        this.app.post('/show', function (req, res) {
            conn.query('SELECT * FROM comments', function (err, rows, fields) {
                res.render("list-view.html", {rows: rows});
                if (err) {
                    console.log("comments not show..");
                }
            });
        });
    },
    deleteComment: function(conn, app, bodyParser){
       // /:id([0-9]+)i
        app.use(bodyParser.urlencoded({extended: false}));
        app.post('/delete/:id', function (req, res) {
            
            var query = conn.query('DELETE FROM comments WHERE  ID = '+req.body.id, {}, function (err, result) {
                if (err) {
                    console.log("comment  not inserted..");
                }
                else {
                    res.send("Thank you");
                }
            });
            //console.log(query.sql); 
        });
    }
};