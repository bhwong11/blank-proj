const express = require('express');
const router = express.Router()
const UserModel = require('../models/UserModel');
const TaskModel = require('../models/TaskModel');
//still need to add in user routes/controllers

//Post Method
router.post('/task/create', async (req, res) => {
  const data = new TaskModel({
    name: req.body.name,
    description: req.body.description,
    user: req.body.user
})

try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
}
catch (error) {
    res.status(400).json({message: error.message})
}
})

router.post('/user/create', async (req, res) => {
  const data = new UserModel({
    name: req.body.name,
    email: req.body.email
})

try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
}
catch (error) {
    res.status(400).json({message: error.message})
}
})

//Get all Method
router.get('/task/getAll', async (req, res) => {
  try{
      const data = await TaskModel.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.get('/user/getAll', async (req, res) => {
  try{
      const usersData = await UserModel.find();
      res.json(usersData)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//Get by ID Method
router.get('/task/getOne/:id', async (req, res) => {
  try{
    const taskData = await TaskModel.findById(req.params.id);
    res.json(taskData)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

//Get by ID Method
router.get('/user/getOne/:id', async (req, res) => {
  try{
    const userData = await UserModel.findById(req.params.id);
    const allUserTasks = await TaskModel.find({
      user:userData._id
    })
    res.json({
      ...userData._doc,
      tasks:allUserTasks
    })
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

//Update by ID Method
router.patch('/task/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await TaskModel.findOneAndUpdate(
        {_id: id}, updatedData, options
    )

    res.status(200).json(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

router.patch('/user/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await UserModel.findByIdAndUpdate(
        id, updatedData, options
    )

    res.status(200).json(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/user/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

router.delete('/task/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TaskModel.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

module.exports = router;