import request from "supertest";

import app from "./app";

describe("Test app.ts", () => {
  test("GET - / should return status 404", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(404);
  });

  test("GET - /api/cards should return status 200", async () => {
    const res = await request(app).get("/api/cards");
    expect(res.status).toEqual(200);
  });
});
