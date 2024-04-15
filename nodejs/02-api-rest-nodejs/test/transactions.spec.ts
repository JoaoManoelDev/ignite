import { afterAll, beforeAll, expect, test } from "vitest"
import request from "supertest"

import { app } from "../src/app"

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test("Should be able a user register a new transaction", async () => {
  const response = await request(app.server)
    .post("/transactions")
    .send({
      title: "New transaction",
      amount: 5000,
      type: "credit"
    })
  
  expect(response.statusCode).toEqual(201)
})
