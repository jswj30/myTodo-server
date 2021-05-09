const { user } = require("../../models");

// 회원가입
module.exports = {
  post: async (req, res) => {
    try {
      // req.body에서 user 정보를 가져오기
      const { email, password, name, mobile } = req.body;

      // 1개라도 정보가 도착하지 않았을 경우
      if (!email || !password || !name || !mobile) {
        res.status(422).send("모든 정보를 입력해주세요.");
      }

      // email, password, name, mobile정보를 DB(user)에 create
      const [user, created] = await user.findOrCreate({
        where: { email: email },
        defaults: {
          password: password,
          name: name,
          mobile: mobile,
        },
      });

      if (!created) {
        // 이미 email이 등록되어 있는 경우.
        res.status(409).send("이미 존재하는 유저입니다.");
      } else {
        // 회원가입 성공했을 경우.
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
