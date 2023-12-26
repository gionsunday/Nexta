import { Schema, model, models } from "mongoose"

const UserSchema = new Schema ({
    email:{
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    usernam:{
        type:String,
        require:[true, "Username is requiured"],
    },
    image:{
        type:String
    }
})

const User = models.User || model("User", UserSchema)

export default User