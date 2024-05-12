import { Router } from 'express'
import { changeUserStatus, getAllUsers } from '../router_handler/manager';

const router = Router();
router.get("/getAllUsers", getAllUsers);
router.post("/changeUserStatus", changeUserStatus);


export default router;