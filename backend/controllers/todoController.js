import mongoose from 'mongoose';
import Todo from '../models/todoModel.js'

export const postTodo = async(req,res)=>{
    try{
        const todo = req.body;
        if(!todo.text){
            return res.status(400).json({success: false,message: 'Please required all fields'})
        }
        const created = await Todo.create(todo)
        res.status(201).json({success: true,message: 'Todo Created',data : created})
    }catch(err){
        console.log(`Error in Post Todo: ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

export const deleteTodo = async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false,message: 'Invalid Todo Id'})
        }
        const deleted = await Todo.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(400).json({success: false,message: 'Todo Not Found'})
        }
        res.status(200).json({success: true,message: 'Todo Deleted',data : deleted})
    }catch(err){
        console.log(`Error in Delete Todo: ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

export const getAllTodos = async(req,res)=>{
    try{
        const getAll = await Todo.find({})
        res.status(200).json({success: true,message: 'Get All Todos',data : getAll})
    }catch(err){
        console.log(`Error in Get All Todos: ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}

export const putTodo = async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false,message: 'Invalid Todo Id'})
        }
        const updated = await Todo.findByIdAndUpdate(req.params.id,req.body,{new: true})
        res.status(201).json({success: true,message: 'Todo Updated',data : updated})
    }catch(err){
        console.log(`Error in Put Todo: ${err.message}`)
        res.status(500).json({success: false,message: 'Internal Server Error'})
    }
}