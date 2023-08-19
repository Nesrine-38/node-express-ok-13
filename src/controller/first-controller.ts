import { Router } from "express";


export const firstController = Router();

const names = ['Nesrine','Nisreen','Mohamed','Jean', 'Maria', 'Souria', 'Albert'];

firstController.get('/', (req,res) => {
    res.json(names);
});

firstController.post('/', (req,res) => {
    names.push(req.body.name);
    res.json(names);
});