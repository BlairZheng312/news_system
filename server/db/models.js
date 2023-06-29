import mongoose, { Schema } from 'mongoose';

mongoose.connect('mongodb://localhost:27017/news_system')

const conn = mongoose.connection

conn.on('connected', () => {
    console.log('db connected')
})

const userSchema = new Schema({
    username: { type: String, requireed: true },
    password: { type: String, requireed: true },
    type: { type: String, requireed: true },
});

const UserModel = mongoose.model('user', userSchema);

export {
    UserModel
}