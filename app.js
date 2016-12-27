var express = require('express');
var app = express();

var mysql = require('mysql');

var connection  = mysql.createConnection({
		socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'prod_clone'
});


connection.connect(function(err) {
	if (err) throw err
	console.log('You are now connected...')
	connection.query('CREATE TABLE IF NOT EXISTS people(id int auto_increment primary key, name varchar(255), age int, address text)',
	function(err, result) {
		if (err) throw err

		connection.query('INSERT INTO people (name, age, address) VALUES (?, ?, ?)', 
			['Larry', '41', 'California, USA'], 
			function(err, result) {
				if (err) throw err
				connection.query('SELECT * FROM people', function(err, results) {
					if (err) throw err
					console.log(results[0].id)
					console.log(results[0].name)
					console.log(results[0].age)
					console.log(results[0].address)
				})
		})
	}) 
})

app.get('/', function(request, response) {
	response.send('OK');
});

module.exports = app;
