const express = require("express");
const TicketController = require("../../controllers/ticket-controller");

const router = express.Router();

router.post("/tickets",TicketController.create);
router.patch("/tickets/:id",TicketController.update);
router.delete("/tickets/:id",TicketController.destroy);

module.exports = router;