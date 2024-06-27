const request = require("supertest");
const app = require("./src/app"); // Sesuaikan dengan path aplikasi Anda

describe("CRUD API Endpoints", () => {
  let testId;

  it("should create a new item", async () => {
    const res = await request(app).post("/items").send({
      name: "Test Item",
      description: "This is a test item",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    testId = res.body.id;
  });

  it("should fetch all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("length");
  });

  it("should fetch a single item", async () => {
    const res = await request(app).get(`/items/${testId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", testId);
  });

  it("should update an item", async () => {
    const res = await request(app).put(`/items/${testId}`).send({
      name: "Updated Test Item",
      description: "This is an updated test item",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Updated Test Item");
  });

  it("should delete an item", async () => {
    const res = await request(app).delete(`/items/${testId}`);
    expect(res.statusCode).toEqual(204);
  });
});
