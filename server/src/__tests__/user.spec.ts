import { getUsers } from "../controllers/userController";
/** Call a Prisma singleton to mock data */
import prisma from "../shared/singleton";
import { Request, Response } from "express";

describe("User Controller", () => {
  test("should get users", async () => {
    const users = [
      {
        userId: "3b0fd66b-a4d6-4d95-94e4-01940c99aedb",
        name: "Carly",
        email: "cvansalzberger0@cisco.com",
      },
    ];

    /** Mocking data */
    prisma.users.findMany.mockResolvedValue(users);

    let responseObj = {};
    const res: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObj = result;
      }),
    };

    await getUsers({} as Request, res as Response);
    expect(responseObj).toStrictEqual(users);
  });
});
