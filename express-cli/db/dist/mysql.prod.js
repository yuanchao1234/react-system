"use strict";var mysql=require("mysql"),connection=mysql.createConnection({host:"localhost",user:"root",password:"root",database:"yuan"});connection.connect();var select=function(){var t;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:t="5",connection.query("SELECT * FROM login WHERE ?",[{userID:"Admin"}],function(e,n,o){if(e)throw e;t=n}),console.log(t);case 3:case"end":return e.stop()}})};module.exports={select:select};