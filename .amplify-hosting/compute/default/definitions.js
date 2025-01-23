"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserItem = exports.CommentItem = void 0;
class CommentItem {
    constructor() {
        this.name = "";
        this.id = 0;
        this.email = "";
        this.body = "";
    }
}
exports.CommentItem = CommentItem;
class UserItem {
    constructor() {
        this.name = "";
        this.id = 0;
    }
}
exports.UserItem = UserItem;
