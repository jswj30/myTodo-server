const { user } = require("../../models");

// ๋ก๊ทธ์์
module.exports = {
  post: (req, res) => {
    let sess = req.session;
    if (sess.userid) {
      sess.destroy(() => {
        res.status(200).send("Signout Successful!");
      });
    } else {
      res.status(404).send("Signout Failed..");
    }
  },
};
