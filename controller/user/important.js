const { status } = require("../../models");

module.exports = {
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
      res.status(404).send(err);
    }
  },
};
