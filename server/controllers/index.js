var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {

      models.messages.get(function (err, data) {
        if (err) {
          console.log('ERROR', err);

          res.end();
        } else {
          var patchedData = data.map(function(obj) {
            return {
              objectId: obj.P_Id,
              username: obj.Username,
              text: obj.Txt,
              roomname: obj.Room,
              createdAt: obj.Created_At
            };
          });
          var resData = {results: patchedData};
          res.send(resData);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var reqData = req.body;
      reqData.time = new Date().toISOString().slice(0, 19).replace('T', ' ');
      models.users.post(reqData.username);
      models.messages.post(reqData, res);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post(req.body.username, res);

    }
  }
};

