import { Router } from 'express'
import { changeChatRoomStatus, changeUserStatus, getAllChatRoom, getAllUsers } from '../router_handler/manager';

const router = Router();
router.get("/getAllUsers", getAllUsers);
router.post("/changeUserStatus", changeUserStatus);
router.get("/getAllChatRoom", getAllChatRoom);
router.post("/changeChatRoomStatus", changeChatRoomStatus);

export default router;