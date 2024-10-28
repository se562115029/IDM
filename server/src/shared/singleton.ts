import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";
import prismaClient from "./client";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prisma);
});

// const prisma = mockDeep<PrismaClient>();
const prisma = prismaClient as unknown as DeepMockProxy<PrismaClient>;
export default prisma;
