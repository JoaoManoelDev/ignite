import { execSync } from "node:child_process"
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import request from "supertest"

import { app } from "../src/app"
import { afterEach } from "node:test"

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync("npm run knex migrate:latest")
  })

  afterEach(() => {
    execSync("npm run knex migrate:rollback --all")
  })
  
  it("Should be able a user create a new transaction", async () => {
    const response = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit"
      })
    
    expect(response.statusCode).toEqual(201)
  })

  it("Should be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
    .post("/transactions")
    .send({
      title: "New transaction",
      amount: 5000,
      type: "credit"
    })

    const cookies = createTransactionResponse.get("Set-Cookie") || []

    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200)

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      })
    ])
  })

  it("Should be able to get a specific transaction", async () => {
    const createTransactionResponse = await request(app.server)
    .post("/transactions")
    .send({
      title: "New transaction",
      amount: 5000,
      type: "credit"
    })

    const cookies = createTransactionResponse.get("Set-Cookie") || []

    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200)

    const transactionId = listTransactionResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      })
    )
  })
})