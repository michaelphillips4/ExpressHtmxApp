"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.text());
// set static folder
app.use(express_1.default.static("public"));
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
//parse URL-encoded bodies (as sent by html forms)
app.use(express_1.default.urlencoded({ extended: true }));
//parse JSON bodies (as sent by api clients)
app.use(express_1.default.json());
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://jsonplaceholder.typicode.com/users");
    const users = yield response.json();
    res.send(`<h2>Users</h2><ul>${users.map(user => `<li>${user.name}</li>`).join("")}</ul>`);
}));
app.get("/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://jsonplaceholder.typicode.com/comments");
    const items = yield response.json();
    res.send(`<h2>Comments</h2><ul>${items.map(item => `
        <li class="comment"><i>${item.email}</i><h4>${item.name}</h4>${item.body}</li>`).join("")}</ul>`);
}));
//start server 
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
// Homepage
app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
});
// GET
app.get('/get', (req, res) => {
    res.status(200).header("x-get-header", "get-header-value").send("get-response-from-compute");
});
//POST
app.post('/post', (req, res) => {
    res.status(200).header("x-post-header", "post-header-value").send(req.body.toString());
});
//PUT
app.put('/put', (req, res) => {
    res.status(200).header("x-put-header", "put-header-value").send(req.body.toString());
});
//PATCH
app.patch('/patch', (req, res) => {
    res.status(200).header("x-patch-header", "patch-header-value").send(req.body.toString());
});
// Delete
app.delete('/delete', (req, res) => {
    res.status(200).header("x-delete-header", "delete-header-value").send();
});
