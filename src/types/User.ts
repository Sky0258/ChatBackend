export interface User {
    id: string,
    name: string
}

// 由于多表连接，1 对 n , 所以 n 方应该以数组的形式存在
// 1 个用户有 n 个聊天室，所以聊天室应该以数组的形式
// {
//     userID: 
//     chatRoomList: [
//         {
//             chatRoomID:
//             message: [
                
//             ]
//         }
//     ]
// } 