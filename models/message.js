// Import Message model
let connection = require ("../config/db");

// Import Moment Session Middleware
let moment = require("moment");


class Message{
	constructor(row){
		this.row = row;
	}
	get id(){
		return this.row.id;
	}
	get content(){
		return this.row.content;
	}
	get created_at(){
		return moment(this.row.created_at);
	}
	static create(message,callback){
		// Insert the new message into the DB
		connection.query("INSERT INTO `message` SET content = ?, created_at =?",[message,new Date()],(error,results,fields)=>{
			if(error) throw error;
			// Run the callback function once terminated
			callback();
		});
	}
	static all(callback){

		// Get all messages from DB
		connection.query("SELECT * FROM message",(error,results,fields)=>{
			if(error) throw error;

			// Run the callback function once terminated
			callback(results.map((result)=>{
				return new Message(result);
			}));
		});
		
	}
	static find(id,callback){

		// Get all messages from DB
		connection.query("SELECT * FROM message WHERE id = ?",[id],(error,results,fields)=>{
			if(error) throw error;

			// Run the callback function once terminated
			callback(new Message(results[0]));
		});
		
	}
}

// Export the Message class
module.exports = Message;