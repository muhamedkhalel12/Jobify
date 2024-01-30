import mongoose from 'mongoose'
const { Schema } = mongoose


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: "lastName"
    },
    location: {
        type: String,
        default: "my city"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: String,
    avatarPublicId: String
    // job: {
    //     ref: Job,
    //     type: Schema.Types.ObjectId
    // }
} ,{ timestamps: true })


export default mongoose.model('User', UserSchema)