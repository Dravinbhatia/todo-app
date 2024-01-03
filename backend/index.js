const express = require("express");
const {createTodo,updateTodo} = require("./types");
const {todo} = require('./db');
const app = express();

app.use(express.json());

app.get('/todos',async function(req,res){
    const response = await todo.find({});
    res.json(response);
});

app.post('/todo',async function(req,res){
    const reqPayload = req.body;
    const parsedPayload = createTodo.safeParse(reqPayload);
    if(!parsedPayload.success){
        res.status(400).json({
            msg : "Wrong inputs!!"
        })
        return;
    }

    await todo.create({
        title : reqPayload.title,
        description : reqPayload.description,
        completed : false
    });

    res.status(200).send("Todo added!!")
});

app.put('/completed',async function(req,res){
    const reqPayload = req.body;
    const parsedPayload = updateTodo.safeParse(reqPayload);
    if(!parsedPayload.success){
        res.status(400).json({
            msg : "Wrong Input"
        });
        return;
    }

    const id = req.body.id;
    const response = await todo.find({_id : id});
    console.log("RESPONSE : "+response)
    if(!response.length){
        res.send("ID does not exists!!")
        return;
    }
    await todo.findByIdAndUpdate({_id : id},{
        completed : true
    });
    res.send("Todo Completed!!");
});

app.listen(3000);

