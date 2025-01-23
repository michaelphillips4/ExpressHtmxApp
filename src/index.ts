// src/index.ts
import express from 'express';
import {CommentItem, UserItem} from "./definitions";

const app: express.Application = express();
const port = 3000;



// set static folder
app.use(express.static("public"));


app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

//parse URL-encoded bodies (as sent by html forms)
app.use(express.urlencoded({extended: true}));

//parse JSON bodies (as sent by api clients)
app.use(express.json());


app.get("/users", async (req: express.Request, res: express.Response) =>{

   const response = await fetch("https://jsonplaceholder.typicode.com/users");

   const users:UserItem[] = await response.json();

    res.send(`<h2>Users</h2><ul>${users.map(user=> `<li>${user.name}</li>`).join("")}</ul>`);

});

app.get("/comments", async (req: express.Request, res: express.Response) =>{

    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
 
    const items:CommentItem[] = await response.json();
 
     res.send(`<h2>Comments</h2><ul>${items.map(item=> `
        <li class="comment"><i>${item.email}</i><h4>${item.name}</h4>${item.body}</li>`).join("")}</ul>`);
 
 });


// Homepage
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send("Hello World!");
});

// GET
app.get('/get', (req: express.Request, res: express.Response) => {
  res.status(200).header("x-get-header", "get-header-value").send("get-response-from-compute");
});

