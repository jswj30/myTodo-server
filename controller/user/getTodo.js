const { todo } = require("../../models");

// todo 정보 보내기
module.exports = {
  get: async (req, res) => {
    try {
      let todos = await todo.findAll({
        attributes: ["id", "content", "startDate"],
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
