import { Router } from "express";
import { personRepository } from "../repository/person-repository";
import { checkId } from "../middleware";
import Joi from "joi";


export const personController = Router();

personController.get('/', async (req,res) => {
    const persons = await personRepository.findAll();
    res.json(persons);
});

personController.get('/:id', checkId, async (req,res) => {
    
    const person = await personRepository.findById(req.params.id);
    if(!person) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(person);
});

personController.post('/', async (req,res) => {
    const validation = personValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const person = await personRepository.persist(req.body);
    res.status(201).json(person);
});

personController.delete('/:id', checkId, async (req,res)=> {
    await personRepository.remove(req.params.id);
    res.status(204).end();
});


personController.patch('/:id', checkId, async (req,res)=> {
    const validation = personPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await personRepository.update(req.params.id, req.body);
    res.json(req.body);
});


const personValidation = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().positive().required(),
    address: Joi.object({
        number: Joi.string().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

const personPatchValidation = Joi.object({
    name: Joi.string(),
    age: Joi.number().positive(),
    address: Joi.object({
        number: Joi.string(),
        street: Joi.string(),
        city: Joi.string(),
        country: Joi.string()
    })
});
