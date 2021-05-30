const { user } = require("../../models");

module.exports = {
  // 유저 정보 확인
  post: async (req, res) => {
    const sess = req.session;
    try {
      if (sess.userid) {
        const { id, password } = req.body;
        let userInfo = await user.findOne({
          where: {
            id,
            password,
          },
        });

        if (userInfo) {
          const { email, password, name, mobile } = userInfo;
          // let hidePassword = password
          //   .split("")
          //   .reduce((acc, val) => (acc += "*"), "");
          let result = {
            email,
            password,
            // password: hidePassword,
            name,
            mobile,
          };
          res.status(200).send(result);
        } else {
          res.status(404).send("비밀번호가 틀렸습니다.");
        }
      } else {
        res.status(401).send("Not found Session!");
      }
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
