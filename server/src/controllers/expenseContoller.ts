import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import prisma from "../shared/client";

const prismaClient = prisma;
export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByCategorySummaryRaw =
      await prismaClient.expenseByCategory.findMany({
        orderBy: {
          date: "desc",
        },
      });

    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );
    res.json(expenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving expense" });
  }
};
