import { Router } from "express";
const router = Router();
import { sendMessage, getHistory } from "../controller/chat.controller";
import { validate } from "../middleware/validate.middleware";
import { sendMessageSchema } from "../validators/chat.validator";
import { rateLimiter } from "../middleware/rateLimiter";


router.post("/message", rateLimiter, validate(sendMessageSchema), sendMessage);
router.get("/history/:sessionId", getHistory );

export default router;