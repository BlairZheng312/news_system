import mongoose, { Schema } from 'mongoose';

mongoose.connect('mongodb://localhost:27017/news_system')

const conn = mongoose.connection

conn.on('connected', () => {
    console.log('db connected')
})

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    area: { type: String, required: true },
    register_time: Number,
    role: { type: String, required: true },
    role_permission: Array
});

const UserModel = mongoose.model('user', userSchema);

export {
    UserModel
}