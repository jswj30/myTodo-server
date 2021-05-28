const { todo, joinTable, status } = require("../../models");

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
          include: {
            model: status,
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
          // console.log(todolist);
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
  post: async (req, res) => {
    try {
      const { content, userId } = req.body;
      let now = new Date();
      let startDate = `${now.getFullYear()}-${
        now.getDay() + 1
      }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      let tod = await todo.create({
        content,
        startDate,
        userId,
      });
      let sta = await status.create({
        important: false,
        complete: false,
        deleteId: false,
      });
      let jt = await joinTable.create({
        todoId: tod.id,
        statusId: sta.id,
      });
      if (tod && sta && jt) {
        let result = {
          tod,
          sta,
          jt,
        };
        res.status(201).json(result);
      } else {
        res.status(404).send("todo가 생성되지 않았습니다.");
      }
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
