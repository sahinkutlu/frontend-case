import { rest } from "msw";

// import users from "./entities/users.json" assert { type: "json" };
// import shuffleArray from "./utils";

const handlers = [
  rest.get("/users", () => {}),

  /*
  rest.get("/user/:id", (req, res, ctx) => {}),

  rest.post<IBaseUser>("/user/create", async (req, res, ctx) => {
    const body = await req.json();

    if (body?.firstName) {
      const user: IUser = {
        id: crypto.randomUUID(),
        ...body,
      };

      raw.push(user);

      return res(ctx.status(201), ctx.json(user));
    }

    return res(ctx.status(400));
  }),

  rest.patch<IUser>("/user/update", async (req, res, ctx) => {
    const body = await req.json();

    if (body?.id) {
      raw = raw.map((item) => (item.id === body.id ? body : item));
      return res(ctx.status(200));
    }

    return res(ctx.status(400));
  }),

  rest.delete("/user/:id", (req, res, ctx) => {
    const { id } = req.params;

    if (id) {
      const userId = raw.findIndex((item) => item.id === id);
      if (userId !== -1) {
        raw = raw.filter((item) => item.id !== id);
        return res(ctx.status(200));
      }
      return res(ctx.status(404));
    }

    return res(ctx.status(400));
  }), */
];

export default handlers;
