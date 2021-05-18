const { user } = require("../../models");

// 로그인
module.exports = {
  post: async (req, res) => {
    try {
      // req에서 email, password 저장하기
      const { email, password } = req.body;
      // 세션 regenerate
      req.session.regenerate(async (err) => {
        // user 찾기
        let result = await user.findOne({
          where: { email, password },
        });
        if (result) {
          req.session.userid = result.id;
          res.status(200).json(result);
        } else {
          res.status(404).send("유저를 찾을 수 없습니다.");
        }
      });
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
