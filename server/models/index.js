var db = require('../db');

var OurDB = db.theConnection;

module.exports = {
  messages: {
    get: function (cb) { // a function which produces all the messages
      OurDB.query('SELECT * FROM messages', function ( err, data) {
        if (err) {
          return cb(err);
        }
        cb(null, data);
      }); 
    }, 

    post: function (obj, res) {
      // cb = OurDB.get().query('INSERT INTO messages (')
      OurDB.query('SELECT * from users where Name = ?', obj.username, function(err, data1) {
        if (err) {
          throw err;
        } else {
          OurDB.query('INSERT INTO messages (username, Txt, Room, U_Id, Created_At) VALUES (?, ?, ?, ?, ?)', 
          [obj.username, obj.text, obj.roomname, data1[0].Id, obj.time], function(err, data2) {
            if (err) {
              throw err;           
            } else {
              res.end();
            }
          });
        }
      }); // a function which can be used to insert a message into the database
    }
  },

  users: {
    // Ditto as above.
    get: function () { 
    },
    post: function (name, res) {
      OurDB.query('INSERT IGNORE INTO users (Name) VALUES (?)', name, function(err, data1) {
        if (err) {
          throw err;
        } 
      });
    }
  } 
};

