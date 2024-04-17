import { Router } from 'express'
import { createUser, getFriendList, register } from '../router_handler/user';

const router = Router();

router.post("/register", register);
router.get("/getFriendList", getFriendList)

export default router;

