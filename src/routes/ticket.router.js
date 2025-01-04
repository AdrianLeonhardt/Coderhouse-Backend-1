import express from "express";
import ticketController from "../controllers/ticket.controller.js";
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate("current", { session: false }), ticketController.create);

router.get("/:ticketId", ticketController.getTicketById);

export default router;