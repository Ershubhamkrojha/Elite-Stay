import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const RoleSchema = mongoose.Schema({
//     role_type : {
//         type : String,
//         required : true,
//         unique : true
//     },
//     users :[{
//         type : mongoose.Schema.Types.ObjectId,
//         ref : 'User'
//     }]
// });


// export const role = mongoose.model('role',RoleSchema);

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: String,
        required: true,
    }, img: {
        type: String,
        required: true,
        default:
            "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    city: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
    , password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    bookingDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Roombooked",
        }
    ],
}, { timestamps: true }
);
export default mongoose.model("User", UserSchema);