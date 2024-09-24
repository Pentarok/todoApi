const express = require('express');
const mongoose = require ('mongoose');
const TodoModel = require('./models/TodoModel');
const cors = require('cors');




const cookieParser = require('cookie-parser');

const app = express();




app.use(cors({
    origin: 'https://todo-client-git-main-mak-pentaroks-projects.vercel.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// middlewares
app.use(express.json());
app.use(cookieParser());
/*let uri = 'mongodb://127.0.0.1:27017/test';*/

let uri = 'mongodb+srv://og:OG1234@cluster0.sul4j.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0' 

mongoose.connect(uri)
.then(
    console.log('Connected to the database')
)

app.listen('3000',()=>{
    console.log('server is running on port 3000');
})
app.post('/todo',async (req,res)=>{
    try {
        console.log(req.body)
        const todo = await TodoModel.create({
            Task:req.body.newTask
        
        })
        res.json(todo)
      
    } catch (error) {
        res.json('error')
    }


})
app.get('/todos',async (req,res)=>{
const todos = await TodoModel.find({});
res.json(todos)
})

app.delete('/todo/:id',async(req,res)=>{
    try {
        const { id }=req.params;
        const deletedTodo = await TodoModel.findByIdAndDelete(id)
       res.json('success')
    } catch (error) {
        res.json('An error occured')
    }
  
})
app.put('/todo/:id/markDone', async (req, res) => {
    const { id } = req.params;
    const { done } = req.body; // Expecting a body with { done: true/false }

    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done }, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json('An error occurred');
    }
});


app.put('/todo/updateOrder', async (req, res) => {
    const { tasks } = req.body;
  
    try {
      const updatePromises = tasks.map(task =>
        TodoModel.findByIdAndUpdate(task._id, { order: task.order }, { new: true }) // Update order based on task.order
      );
  
      await Promise.all(updatePromises);
      res.status(200).send("Task order updated successfully.");
    } catch (error) {
      console.error("Error updating tasks:", error);
      res.status(500).send("Error updating task order.");
    }
  });
