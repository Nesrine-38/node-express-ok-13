import { Router } from "express";
import Joi from "joi";
import bcrypt from 'bcrypt';
import {sign} from 'jsonwebtoken';
import { userRepository } from "../repository/user-repository";


export const authController = Router();

authController.post('/api/user', async (req,res) => {

    const validation = userValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    if(await userRepository.findByEmail(req.body.email)) {
        res.status(400).json({error: 'User Already Exist'});
        return;
    }
    req.body.role = 'ROLE_USER';
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await userRepository.persist(req.body);

    res.status(201).json(user);


});

authController.post('/api/login', async (req,res) => {
    const validation = userValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const user = await userRepository.findByEmail(req.body.email)
    if(!user) {
        res.status(401).json({error: 'No user with this email'});
        return;
    }
    const passwordCheck = await bcrypt.compare(req.body.password, user.password);
    if(!passwordCheck) {
        res.status(401).json({error: 'Credentials error'});
        return;
    }
    const token = sign(user, process.env.JWT_SECRET!);
    res.json({token});
})


const userValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});