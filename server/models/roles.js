import mongoose, { Schema } from 'mongoose';

const roleSchema = new Schema({
    role_name: {type: String, required: true}, 
    auth_name: String, 
    auth_time: Number, 
    create_time: {type: Number, default: Date.now}, 
    menus: Array 
});

const RoleModel = mongoose.model('role', roleSchema);

export {
    RoleModel
}