import { getDashboardMetrics } from "../controllers/dashboardController";
import prisma from "../shared/singleton";
import { Request, Response } from "express";
describe("Dashboard Controller", () => {
  test("should get dashboard matrix", async () => {
    const dashboardMatrix = {
      popularProducts: [
        {
          productId: "000a8c23-5bca-436c-a216-4e747a94c511",
          name: "Yew Plum Pine",
          price: 196.27,
          rating: 1.6,
          stockQuantity: 967173,
        },
      ],
      salesSummary: [
        {
          salesSummaryId: "c85efa84-d294-4c2e-a9a5-8774d92af8bf",
          totalValue: 2882180.14,
          changePercentage: 57.29,
          date: new Date("2024-03-13T01:19:11.000Z"),
        },
      ],
      purchaseSummary: [
        {
          purchaseSummaryId: "a9c42568-3668-4750-93a4-b8798471acde",
          totalPurchased: 8176245.28,
          changePercentage: -80.84,
          date: new Date("2024-02-07T16:49:38.000Z"),
        },
      ],
      expenseSummary: [
        {
          expenseSummaryId: "b149ef3b-f9cc-4560-ab29-4f74ec138c71",
          totalExpenses: 80265893.3,
          date: new Date("2022-12-21T05:58:49.000Z"),
        },
      ],
      expenseByCategorySummary: [
        {
          expenseByCategoryId: "9a86fea1-8b89-4f2f-829f-4406e530934d",
          expenseSummaryId: "cdfd8bfd-1851-4cd1-ab5f-e66e7260ba92",
          category: "Office",
          amount: "18",
          date: new Date("2024-03-11T08:04:25.000Z"),
        },
      ],
    };
    prisma.products.findMany.mockResolvedValue(dashboardMatrix.popularProducts);
    prisma.salesSummary.findMany.mockResolvedValue(
      dashboardMatrix.salesSummary
    );
    prisma.purchaseSummary.findMany.mockResolvedValue(
      dashboardMatrix.purchaseSummary
    );
    prisma.expenseSummary.findMany.mockResolvedValue(
      dashboardMatrix.expenseSummary
    );
    prisma.expenseByCategory.findMany.mockResolvedValue([
      {
        expenseByCategoryId: "9a86fea1-8b89-4f2f-829f-4406e530934d",
        expenseSummaryId: "cdfd8bfd-1851-4cd1-ab5f-e66e7260ba92",
        category: "Office",
        amount: BigInt(18),
        date: new Date("2024-03-11T08:04:25.000Z"),
      },
    ]);

    let responseObj = {};
    const res: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObj = result;
      }),
    };

    await getDashboardMetrics({} as Request, res as Response);
    expect(responseObj).toStrictEqual(dashboardMatrix);
  });
});
