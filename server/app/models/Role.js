import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    modifiedAt:{
        type: Date,
    }
})

export default mongoose.model('Role', roleSchema);