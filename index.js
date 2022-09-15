const Joi = require('joi');
const express = require('express');
const Router = express.Router();
const Courses = require('../models/courses');
const courses = require('../models/courses');

Router.use(express.json());

Router.get('/',async (req,res)=>{
    try{
        const coursess = await Courses.find();
        res.json(coursess); 
    }catch(err){
        res.status(500).json({ message:err.message });
    }
});

Router.post('/', async (req,res)=> {
    const { error } =  validateCourse(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const NewCourse = new Courses({
        name:req.body.name
    })
    try{
        const newCourse = await NewCourse.save();
        res.status(201).json(newCourse)
    }catch(err){
        res.status(400);
    }
});

Router.put('/:id', async(req,res) => {
    if(req.body.name != null) {
        res.course.name = req.body.name;
    }
    
    try{
        const updateCourse = await res.course.save();
        res.json(updateCourse);
    }catch (err){
        res.status(400).json({ message: err.message })
    }
});

Router.delete('/:id',getCourses,async(req,res)=>{
    try{
        await res.course.remove()
        res.json({ message: 'Deleted Course'})
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};

Router.get('/:id',getCourses, (req,res)=>{
    res.send(res.course.name);
});

async function getCourses(req,res,next) {
    let course
    try{
        course = await Courses.findById(req.params.id);
        if(course == null){
            return res.status(404).json({message: 'Cannot find course'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }
    res.course = course
    next();
}

module.exports = Router;