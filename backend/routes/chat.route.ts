import { Router } from "express";
const router = Router();
import { sendMessage } from "../controller/chat.controller";
import { validate } from "../middleware/validate.middleware";
import { sendMessageSchema } from "../validators/chat.validator";


router.post("/message", validate(sendMessageSchema), sendMessage)

export default router;