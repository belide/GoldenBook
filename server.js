// Import ExpressJS
let express = require("express");
let app = express();

// Import Body Parser
let bodyParser = require("body-parser");

// Import Express Session Middleware
let session = require("express-session");

// Import EJS template engine
let ejs = require("ejs");

// Import custom middleware Flash
let flash = require("./middlewares/flash");

// Import Message model
let Message = require ("./models/message");

app

// Templating
.set('view engine',"ejs")
.use("/assets",express.static("public"))

//Middlewares

// parse application/x-www-form-urlencoded
.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
.use(bodyParser.json())

// Set-up and Use Express Session
.use(session({
  secret: 'GoldenBook2017',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
.use(flash)

//Routes
.get("/",(req,res)=>{
	Message.all((messages)=>{
		res.render("pages/index",{messages:messages});
	})
})
.get("/message/:id",(req,res)=>{
	Message.find(req.params.id,(message)=>{
		res.render("messages/show",{message:message});
	});

})
.post("/",(req,res)=>{
	//If the message body is empty
	if(req.body.message===undefined || req.body.message===""){
		//flash an error message
		req.flash("error","Empty message :(");
		// Redirect to home
		res.redirect("/")
	// If the message body is not empty
	} else {
		// Create a new message and save it.
		Message.create(req.body.message,()=>{
			req.flash("success","Message added :)");
			// Redirect to home
			res.redirect("/")

		});	
	}

})
// Listen on port 8080
.listen(8080);

