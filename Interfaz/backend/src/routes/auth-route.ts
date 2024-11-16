import { Router, Request, Response } from 'express';
import { createAccessToken } from '../libs/jwt';
import UserController from '../controllers/auth-controller';
import jwt from 'jsonwebtoken';
import User from '../models/user-model';
//import {authRequired} from '../middlewares/validateToken.js';
const router = Router();
const userController = UserController.getInstance();

export const verifyToken = async (req: any, res: any) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    jwt.verify(token, "TOKEN_SECRET", async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "authorization denied" });
        const { username } = decoded;

        const user = await User.find({username: username});
        if (!user) {
            return res.status(404).json({messages: ['User not found']});
        }
        
        return res.json(user);

    });
};

// CRUD
router.post('/register', async (req, res) => {
    try {
        const newUser = await userController.createUser(
            req.body.username, req.body.name, req.body.phone,
            req.body.email, req.body.password, req.body.rol
        )
        const token = await createAccessToken({ id: newUser.username, username: newUser.username });
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false
        });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const user = await userController.getUser(req.body.username, req.body.password);
        //const token = await createAccessToken({ id: user.username, username: user.username });
        const token = await createAccessToken({ id: req.body.username, username: req.body.username });
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false
        });
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/verify', verifyToken);

export default router;