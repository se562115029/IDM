import { Request, Response } from "express";
import prisma from "../shared/client";

const prismaClient = prisma;

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prismaClient.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};
