import type { Request, Response } from "express";
import { chatService } from "../services/chat.service";


export const sendMessage = async (req: Request, res: Response) => {
    const {message, sessionId} = req.body;
    const response = await chatService.sendMessage(
        message, sessionId);

    res.status(200).json(response);
};