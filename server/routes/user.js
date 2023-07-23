import express from 'express';
import * as controller from '../controllers/userController.js'
import { verifyJwt } from '../middlewares/verifyJwt.js';

const router = express.Router();
router.use(verifyJwt)

router.route('/users').get(controller.getAllUsers).post(controller.createUser)
router.route('/users/:id').put(controller.updateUser).delete(controller.deleteUser);
router.route('/getSingleuser/:id').get(controller.getSingleUserData)

export default router;