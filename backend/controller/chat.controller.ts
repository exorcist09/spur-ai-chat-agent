import type { Request, Response, NextFunction } from "express";
import { chatService } from "../services/chat.service";
import { prisma } from "../config/prisma";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, sessionId } =
      req.body;

    const response =
      await chatService.sendMessage(
        message,
        sessionId
      );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


export const getHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.sessionId as string;

    const messages =
      await prisma.message.findMany({
        where: {
          conversationId: sessionId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    res.status(200).json({
      messages,
    });
  } catch (error) {
    next(error);
  }
};