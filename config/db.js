//  Import mysql
let mysql = require("mysql")

// Create the connection
let connection  = mysql.createConnection({
	host: "YOUR_HOST_NAME", 	//!! change this !!
	user: "YOUR_USER",		//!! change this !!
	password:"YOUR_PASSWORD",	//!! change this !!
	database: "golden_book"
});

// Connect using parameters
connection.connect((err)=> {
	if (err) {
	  	console.error('error connecting: ' + err.stack);
	   	return;
	}
	console.log('connected as id ' + connection.threadId);
});

//Export the connection 
module.exports = connection;
