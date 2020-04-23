const {requestLogger, setResponseHeaders} = require("../middleware/apiCommon")
const express = require("express");
const router = express.Router();

router.use(requestLogger);
router.use(setResponseHeaders);
//get all cards
router.get("/cards", async function(req, res, next) {
    // let cards = await innovationDAO.getAllCards(req.query.icon, req.query.color, req.query.age, req.query.description);
    // return res.send(cards);
})

router.get("/cards/:cardName", async function(req, res, next) {
    // let cardName = req.params.cardName.replace(/\_/g, " ");
    // let cards = await innovationDAO.getCard(cardName)
    // return res.send(cards);
});

module.exports = router;