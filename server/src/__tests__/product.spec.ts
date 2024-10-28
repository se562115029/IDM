import { STATUS_CODES } from "http";
import { createProduct, getProducts } from "../controllers/productController";
import prisma from "../shared/singleton";
import { Request, Response } from "express";
describe("Product Controller", () => {
  test("should get products", async () => {
    const products = [
      {
        productId: "000a8c23-5bca-436c-a216-4e747a94c511",
        name: "Yew Plum Pine",
        price: 196.27,
        rating: 1.6,
        stockQuantity: 967173,
      },
      {
        productId: "d35623ee-bef6-42b2-8776-2f99f8bb4782",
        name: "Pinkscale Blazing Star",
        price: 456.04,
        rating: 2.25,
        stockQuantity: 124834,
      },
    ];

    prisma.products.findMany.mockResolvedValue(products);

    let responseObj = {};
    const res: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObj = result;
      }),
    };
    const req = { query: { search: undefined } } as any as Request;
    await getProducts(req, res as Response);
    expect(responseObj).toStrictEqual(products);
  });

  test("should get product by param", async () => {
    const products = [
      {
        productId: "000a8c23-5bca-436c-a216-4e747a94c511",
        name: "Yew Plum Pine",
        price: 196.27,
        rating: 1.6,
        stockQuantity: 967173,
      },
    ];

    prisma.products.findMany.mockResolvedValue(products);

    let responseObj = {};
    const res: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObj = result;
      }),
    };
    const req = { query: { search: "s" } };
    await getProducts(req as any as Request, res as Response);
    expect(responseObj).toStrictEqual(products);
  });

  test("should create product", async () => {
    const createdProduct = {
      productId: "000a8c23-5bca-436c-a216-4e747a94c511",
      name: "test test",
      price: 196.27,
      rating: 1.6,
      stockQuantity: 967173,
    };

    prisma.products.create.mockResolvedValue(createdProduct);

    let responseObj = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObj = result;
      }),
    };

    const req = { body: createdProduct } as Request;
    await createProduct(req, res as Response);

    expect(responseObj).toStrictEqual(createdProduct);
  });
});
