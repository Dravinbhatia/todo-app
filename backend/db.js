const mongoose = require("mongoose");
const { Schema } = require("zod");

mongoose.connect("mongodb+srv://dbhatia:Root%401234@admin.yrfk84z.mongodb.net/todo-app")

const schema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
});

const todo = mongoose.model('todos',schema);
module.exports = {
    todo
}