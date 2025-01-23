// src/index.ts
import express from "express";
import { CommentItem, UserItem } from "./definitions";

const app: express.Application = express();
const port = 3000;

// set static folder
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

//parse URL-encoded bodies (as sent by html forms)
app.use(express.urlencoded({ extended: true }));

//parse JSON bodies (as sent by api clients)
app.use(express.json());

app.get("/users", async (req: express.Request, res: express.Response) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const users: UserItem[] = await response.json();

  res.send(`<ul>${users.map((user) => `<li>${user.name}</li>`).join("")}</ul>`);
});

app.post("/users", (req: express.Request, res: express.Response) => {
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      res.send(`new user added id:${json.id}`);
    });

  //res.status(200).header("x-post-header", "post-header-value").send(req.body.toString());
});

app.get("/comments", async (req: express.Request, res: express.Response) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");

  const items: CommentItem[] = await response.json();

  res.send(
    `${items
      .map(
        (item) => `
        <div class="comment"><i>${item.email}</i><h4>${item.name}</h4>${item.body}</div>`
      )
      .join("")}`
  );
});
