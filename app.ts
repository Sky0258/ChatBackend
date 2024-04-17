import express, { Request, Response, NextFunction } from "express";
import userRouter from './src/router/user'
import chatRoomRouter from './src/router/chatRoom'
const app = express();

// 导入跨域 cors 全局挂载
const cors = require('cors');
app.use(cors());

// 处理表单数据中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extend: false}));      // false 时值为数组或字符串，true 时可以为任意值
app.use(bodyParser.json());


// 处理 sql 错误中间件
declare global {
    namespace Express {
        interface Response {
            cc: (err: Error | string, status?: number) => void;
        }
    }
}
app.use((req: Request, res: Response, next: NextFunction) => {
    res.cc = (err: Error | string, status: number = 0) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    };
    next();
});


app.use('/user', userRouter);
app.use('/chatRoom', chatRoomRouter);
app.listen(3007, () => {
    console.log('http://127.0.0.1:3007');
})
