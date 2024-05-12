import { Router } from 'express'
import { createUser, getFriendList, getSelfInfo, register } from '../router_handler/user';

const router = Router();

router.post("/register", register);
router.get("/getFriendList", getFriendList);
router.get("/getSelfInfo", getSelfInfo);

export default router;

