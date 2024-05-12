import db from "../../db/index";
import { Request, Response } from "express";
import { postResponse } from "../types/query-params";
import { AddChatRoomMessageDto } from "../dtos/chatRoomModule.dto";
import { messageRecord } from "../types/messageRecord";

// 根据用户 ID 查询，该用户存在于哪些聊天室
export function getChatRoomList(req: Request, res: Response) {
    const userID = req.query.userID;
    const sql = `SELECT cr.id as chatRoomID , newMessage, createdAt, m.content as lastMessageContent, cr.groupName as groupName 
    FROM chatroom cr LEFT JOIN user_chatroom u ON u.chatRoomID = cr.id
    LEFT JOIN message m ON cr.lastMessage = m.id
    WHERE u.userID = ?`;
    db.query(sql, userID, (err: Error, results: any[]) => {
        if (err) return res.cc(err);
        if (results.length <= 0) return res.cc("数据库查询失败");

        res.send({
            message: "查询聊天室列表成功",
            status: 1,
            results: results,
        });
    });
}

// 查询每个聊天室中的用户有哪些
export function getChatRoomUserList(req: Request, res: Response) {
    const chatRoomID = req.query.chatRoomID;
    const sql = `SELECT userID as id,username, imgUrl as imageUrl FROM user_chatroom uc
    LEFT JOIN user u ON u.id = uc.userID
    WHERE uc.chatRoomID = ?`;

    db.query(sql, chatRoomID, (err: Error, results: any[]) => {
        if (err) return res.cc(err);
        if (results.length <= 0) return res.cc("数据库查询失败");

        res.send({
            message: "查询聊天室用户列表成功",
            status: 1,
            results: results,
        });
    });
}

// 查询聊天室的消息记录
export function getChatRoomMessageRecord(req: Request, res: Response) {
    const chatRoomID = req.query.chatRoomID;
    const sql = `SELECT m.id, userID, username as userName, imgUrl, content, createdAt FROM message m 
  LEFT JOIN user u ON m.userID = u.id
  WHERE chatRoomID = ?`;

    db.query(sql, chatRoomID, (err: Error, results: any[]) => {
        if (err) return res.cc(err);
        if (results.length <= 0) return res.cc("数据库查询失败");

        const targetList = results.map((item) => {
            const target: messageRecord = {
                id: item.id,
                content: item.content,
                createdAt: item.createdAt,
                user: {
                    id: item.userID,
                    name: item.userName,
                    imageUrl: item.imgUrl
                }
            };

            return target;
        });
        
        res.send({
            message: "查询聊天室用户列表成功",
            status: 1,
            results: targetList,
        });
    });
}

// 添加聊天室信息
export function addChatRoomMessage(req: Request, res: Response) {
    const { chatRoomID, content, userID}: AddChatRoomMessageDto = req.body;
    const sql = `INSERT INTO message (chatRoomID, content, userID, createdAt) VALUES (?, ?, ?, ?);`;
    const time = new Date();
    db.query(
        sql,
        [chatRoomID, content, userID, time],
        (err: Error, results: postResponse) => {
            if (err) return res.cc(err);
            if (results.affectedRows <= 0) return res.cc("数据库插入数据操作失败");

            const changeRes = changeChatRoomLastMessage(results.insertId, chatRoomID);
            if (changeRes == 0) {
                res.cc("数据库更新 lastMessage 失败");
            }

            res.send({
                message: "聊天室添加信息成功",
                insertId: results.insertId,
                time,
                status: 1,
            });
        }
    );
}

// 修改最后一条消息ID
export function changeChatRoomLastMessage(messageID: number, chatRoomID: string): number {
    const sql = `UPDATE chatroom SET lastMessage = ? WHERE id = ?`;
    db.query(sql, [String(messageID), chatRoomID], (err: Error, results: postResponse) => {
        if (err) {
            console.log(err);
            return 0;
        }
        if (results.affectedRows <= 0) {
            console.log("数据库插入数据操作失败");
            return 0;
        }

        return 1;
    });

    return 1;
}