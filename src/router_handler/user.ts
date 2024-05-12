import db from "../../db/index";
import { Request, Response} from 'express'
import { CreateUserDto } from "../dtos/createUser.dto";
import { User } from "../types/User";
import { postRequest } from "../types/query-params";

export function register(req: Request, res: Response) {
    res.send('注册');
}

export function createUser(req: Request<{}, {}, CreateUserDto, postRequest>, res: Response) {
    const data1 = req.body.email;
    const postRequestParams = req.query.postId;

    res.send("121212")
}

export function getUserInfo(req: Request, res:Response<User>) {
    res.send({
        id: "12",
        name: "12"
    });
}

// 从这里开始
// 查询好友列表
export function getFriendList(req: Request, res:Response) {
    const userID = req.query.userID;
    const sql = `SELECT uf.friend as friendID, u.username as username, u.imgUrl as imgUrl
    FROM user u LEFT JOIN user_friend uf ON u.id = uf.friend
    WHERE uf.userEntity = ?
    UNION SELECT uf.userEntity as friendID, u.username as username, u.imgUrl as imgUrl FROM user u LEFT JOIN user_friend uf ON u.id = uf.userEntity
    WHERE uf.friend = ?`

    db.query(sql, [userID, userID],(err: Error, results: any[]) => {
        if(err) return res.cc(err);
        if(results.length <= 0) return res.cc('数据库查询失败');

        res.send({
            message: "查询好友列表成功",
            status: 1,
            results: results
        })
    })
}

// 获取用户个人信息
export function getSelfInfo(req: Request, res:Response) {
    const userID = req.query.userID;
    const sql = `SELECT * FROM user WHERE id = ?`

    db.query(sql, userID ,(err: Error, results: any[]) => {
        if(err) return res.cc(err);
        if(results.length <= 0) return res.cc('数据库查询失败');

        res.send({
            message: "查询个人信息成功",
            status: 1,
            results: results[0]
        })
    })
}