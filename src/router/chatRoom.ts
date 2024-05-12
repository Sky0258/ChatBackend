import { Router } from 'express'
import { addChatRoomMessage, getChatRoomList, getChatRoomMessageRecord, getChatRoomUserList } from '../router_handler/chatRoom';

const router = Router();

router.get("/getChatRoomList", getChatRoomList);
router.get("/getChatRoomUserList", getChatRoomUserList);
router.get("/getChatRoomMessageRecord", getChatRoomMessageRecord);
router.post("/addChatRoomMessage", addChatRoomMessage);

export default router;
