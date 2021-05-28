const express = require("express");
const router = express.Router();
const { indexController } = require("../controller");

router.post("/signup", indexController.signup.post);
router.post("/signin", indexController.signin.post);
router.get("/gettodo", indexController.todo.get);
router.post("/posttodo", indexController.todo.post);
router.post("/signout", indexController.signout.post);
router.post("/removetodo", indexController.removeTodo.post);
router.patch("/important", indexController.important.patch);
router.get("/importanttodo", indexController.important.get);

module.exports = router;
