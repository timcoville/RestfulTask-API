// imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// settings
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// mongoose
mongoose.connect('mongodb://localhost/task_api');

var TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false},
    },{timestamps: true})

mongoose.model('Task', TaskSchema)
var Task = mongoose.model('Task')

app.get('/tasks', (req, res)=>{
    Task.find({}, (err, data)=>{
        if(err){console.log(err)}
        else{
            res.json(data)
        }
    })
})

app.get('/tasks/:id', (req, res)=>{
    Task.findOne({_id: req.params.id}, (err, data)=>{
        if(err){console.log(err)}
        else{
            res.json(data)
        }
    })
})

app.post('/tasks', (req, res)=>{

    Task.create({title: req.body.title, description: req.body.description, completed: req.body.completed }, (err, data)=>{
        if(err){console.log(err)}
        else{
            res.redirect('/tasks')
        } 
    })
})

app.put('/tasks/:id', (req, res)=>{
    Task.findOne({_id: req.params.id}, (err, data)=>{
        if(err){console.log(err)}
        else{
            Task.update(data, {title: req.body.title, description: req.body.description, completed: req.body.completed }, (err, data)=>{
                if(err){console.log(err)}
                else{
                    res.json(data)
                }
            })     
        }
    })
})    

app.delete('/tasks/:id', (req, res)=>{
    Task.findOne({_id: req.params.id}, (err, data)=>{
        if(err){console.log(err)}
        else{
            Task.remove(data, (err)=>{
                res.redirect('/tasks')
            })
        }
    })
})


app.listen('8000', ()=>{
    console.log("Running on 8000")
})