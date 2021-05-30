const { user } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    try {
      const { id, password, name, mobile } = req.body;
      let users = await user.update(
        {
          password,
          name,
          mobile,
        },
        {
          where: {
            id,
          },
        }
      );
      if (users) {
        let aftUser = await user.findOne({
          where: {
            id,
          },
          attributes: ["email", "password", "name", "mobile"],
        });

        res.status(200).json(aftUser);
      } else {
        res.status(404).send("User가 수정되지 않았습니다.");
      }
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
