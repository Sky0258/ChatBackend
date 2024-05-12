import db from "../../db/index";
import { Request, Response } from "express";
import { postResponse } from "../types/query-params";

// 后台查询所有用户
export function getAllUsers(req: Request, res: Response) {
    const sql = "SELECT id as 'key', id, username, email, `status` FROM user";
    db.query(sql, (err: Error, results: any[]) => {
        if (err) return res.cc(err);
        if (results.length <= 0) return res.cc("数据库查询失败");

        res.send({
            message: "后台查询所有用户列表成功",
            status: 1,
            results: results,
        });
    });
}

// 修改用户权限
export function changeUserStatus(req: Request, res: Response) {
    const userID = req.body.userID;
    const status = req.body.status;
    const sql = "UPDATE user SET status = ? WHERE id = ?";
    db.query(sql, [status, userID], (err: Error, results: postResponse) => {
        if (err) return res.cc(err);
        if (results.affectedRows <= 0) return res.cc("数据库更新数据操作失败");

        res.send({
            message: "修改用户权限成功!",
            status: 1
        });
    });
}

// 查询所有聊天室
export function getAllChatRoom(req: Request, res: Response) {
    const sql = "SELECT id as 'key', id, groupName, `status` FROM `chatroom` WHERE groupName != 'null'";
    db.query(sql, (err: Error, results: any[]) => {
        if (err) return res.cc(err);
        if (results.length <= 0) return res.cc("数据库查询失败");

        res.send({
            message: "后台查询所有用户列表成功",
            status: 1,
            results: results,
        });
    });
}

// 修改聊天室权限
export function changeChatRoomStatus(req: Request, res: Response) {
    const chatRoomID = req.body.chatRoomID;
    const status = req.body.status;
    const sql = "UPDATE chatroom SET status = ? WHERE id = ?";
    db.query(sql, [status, chatRoomID], (err: Error, results: postResponse) => {
        if (err) return res.cc(err);
        if (results.affectedRows <= 0) return res.cc("数据库更新数据操作失败");

        res.send({
            message: "修改聊天室权限成功!",
            status: 1
        });
    });
}