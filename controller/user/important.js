const { todo, status } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const sess = req.session;
    try {
      if (sess.userid) {
        let todos = await todo.findAll({
          where: {
            userId: sess.userid,
          },
          attributes: ["id", "content", "startDate"],
          include: {
            model: status,
            where: {
              important: true,
            },
            attributes: ["important", "complete"],
          },
        });

        if (todos) {
          let todolist = todos.map((a) => {
            return {
              id: a.id,
              content: a.content,
              startDate: a.startDate,
              important: a.statuses[0].important,
              complete: a.statuses[0].complete,
            };
          });
          res.status(200).json(todolist);
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
  patch: async (req, res) => {
    try {
      const { id } = req.body;
      let staBefore = await status.findOne({
        where: {
          id,
        },
        attributes: ["important"],
      });
      let sta = await status.update(
        { important: !staBefore.important },
        {
          where: {
            id,
          },
        }
      );
      let staAfter = await status.findOne({
        where: {
          id,
        },
        attributes: ["important"],
      });

      if (sta) {
        res.status(200).json(staAfter);
      } else {
        res.status(404).send("Important가 수정되지 않았습니다.");
      }
    } catch (err) {
      res.status(404).json(err);
    }
  },
};
