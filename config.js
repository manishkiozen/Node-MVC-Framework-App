/**
 * Responsible for view
 * 
 * @type type
 */
module.exports = {
    init: function () {
        console.log("config init..");
    },
    dbConnect: function (mysql) {
       var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'sparx',
            database: 'test_comment_system'
        });

        connection.connect(function (err) {
            if (err){
                console.log("Error connecting database ...");
            }
        });
        return connection;
    },
    ejsSetup: function (app, ejs, express) {
        app.set('view engine', 'ejs');
        app.engine('html', ejs.renderFile);

        app.use(express.static(__dirname + '/public'));
        app.set('views', __dirname + '/views');

    }
};