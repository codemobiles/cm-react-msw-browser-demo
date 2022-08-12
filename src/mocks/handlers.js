import { rest } from "msw";
export const handlers = [
  rest.get("/feed", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(["Lek CodeMobiles", "Angular", "ReactJS", "VueJS", "Flutter"])
    );
  }),
];
