const { todo, joinTable, status } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      const { id } = req.body;
      // todo 삭제
      let tod = await todo.destroy({
        where: {
          id,
        },
      });
      // joinTable 삭제
      let jt = await joinTable.destroy({
        where: {
          id,
        },
      });
      // status 삭제
      let sta = await status.destroy({
        where: {
          id,
        },
      });
      // 클라이언트에 응답
      if (tod && jt && sta) {
        res.sendStatus(204);
      } else {
        res.status(404).send("todo가 삭제되지 않았습니다.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
