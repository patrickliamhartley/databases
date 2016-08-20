var db = require('../db');

var OurDB = db.theConnection;

module.exports = {
  messages: {
    get: function (cb) { // a function which produces all the messages
      OurDB.get().query('SELECT * FROM messages', function ( err, data) {
        if (err) {
          return cb(err);
        }
        cb(null, data);
      }); 
    }, 
    post: function (obj) {
      // cb = OurDB.get().query('INSERT INTO messages (')
      OurDB.get().query('SELECT name from users where name = obj.username', function(err, data1) {
        if (err) {
          throw err;
        } else {
          OurDB.get().query('INSERT INTO messages (username, Txt, Room, U_Id, R_Id, Created_At) VALUES (?, ?, ?, ?, ?)', 
          [obj.username, obj.text, obj.room, data1, 1, obj.time], function(err, data2) {
            if (err) {
              throw err;
            } 
          });
        }
      }); // a function which can be used to insert a message into the database
    }
  },

  users: {
    // Ditto as above.
    get: function () { },
    post: function () {}
  }
};

