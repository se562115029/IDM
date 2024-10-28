import { getExpensesByCategory } from "../controllers/expenseContoller";
import prisma from "../shared/singleton";
import { Request, Response } from "express";
describe("Expense Controller", () => {
  test("should get expense by category", async () => {
    const expenseByCategorySummary = [
      {
        expenseByCategoryId: "9a86fea1-8b89-4f2f-829f-4406e530934d",
        expenseSummaryId: "cdfd8bfd-1851-4cd1-ab5f-e66e7260ba92",
        category: "Office",
        amount: BigInt(18),
        date: new Date("2024-03-11T08:04:25.000Z"),
      },
    ];

    const result = [
      {
        expenseByCategoryId: "9a86fea1-8b89-4f2f-829f-4406e530934d",
        expenseSummaryId: "cdfd8bfd-1851-4cd1-ab5f-e66e7260ba92",
        category: "Office",
        amount: "18",
        date: new Date("2024-03-11T08:04:25.000Z"),
      },
    ];

    prisma.expenseByCategory.findMany.mockResolvedValue(
      expenseByCategorySummary
    );

    let responseObj = {};
    const res: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObj = result;
      }),
    };

    await getExpensesByCategory({} as Request, res as Response);
    expect(responseObj).toStrictEqual(result);
  });
});
