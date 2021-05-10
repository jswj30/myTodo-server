const { user } = require("../../models");

// 로그인
module.exports = {
  post: async (req, res) => {
    try {
      // req에서 email, password 저장하기
      const { email, password } = req.body;

      // 정보가 덜 왔을 경우
      if (!email || !password) {
        res.status(422).send("모든 정보를 입력해주세요.");
      }

      // user 찾기
      const result = await user.findOne({
        where: { email, password },
      });

      if (result) {
        res
          .status(200)
          .json({
            id: result.id,
            email: result.email,
            name: result.name,
            mobile: result.mobile,
          });
      } else {
        res.status(404).send("유저를 찾을 수 없습니다.");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
