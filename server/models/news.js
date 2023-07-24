import mongoose, { Schema } from 'mongoose';

const newsSchema = new Schema({
    title: {type: String, required: true}, 
    category: {type: String, required: true}, 
    content: {type: String, required: true},
    author: {type: String, required: true}, 
    author_role: {type: String, required: true}, 
    area: {type: String, required: true},
    publishState: {type: Number, required: true},
    publishTime: Number, 
    view: Number,
    star: Number,
});

const NewsModel = mongoose.model('news', newsSchema);

export {
    NewsModel
}