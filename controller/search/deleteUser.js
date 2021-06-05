const { user } = require("../../models");

module.exports = {
  // 회원 탈퇴
  post: async (req, res) => {
    const sess = req.session;
    try {
      if (sess.userid) {
        const { id, email, password } = req.body;
        let deUser = await user.destroy({
          where: {
            email,
            password,
          },
        });

        if (deUser) {
          res.status(200).json(deUser);
          // sess.destroy(() => {
          //   res.status(200).json(deUser);
          // });
        }
      } else {
        res.status(401).send("Not found Session!");
      }
    } catch (err) {
      res.status(404).json(err);
    }
  },
};
