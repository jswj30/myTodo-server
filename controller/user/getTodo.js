const { todo } = require("../../models");

module.exports = {
  get: async (req, res) => {
    // todo 정보 보내기
    const sess = req.session;
    try {
      if (sess.userid) {
        let todos = await todo.findAll({
          where: {
            userId: sess.userid,
          },
          attributes: ["id", "content", "startDate"],
        });

        if (todos) {
          console.log(todos);
          res.status(200).json(todos);
        } else {
          res.sendStatus(204);
        }
      } else {
        res.status(401).send("Not found Session!");
      }
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
