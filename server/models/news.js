import mongoose, { Schema } from 'mongoose';

const newsSchema = new Schema({
    title: {type: String, required: true}, 
    category: {type: String, required: true}, 
    content: {type: String, required: true},
    author: {type: String, required: true}, 
    author_role: {type: String, required: true}, 
    area: {type: String, required: true},
    reviewState: {type: Number, required: true},
    publishState: {type: Number, required: true},
    view: Number,
    star: Number,
    submit_time: Number, 
});

const NewsModel = mongoose.model('news', newsSchema);

export {
    NewsModel
}