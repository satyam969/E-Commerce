const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    address: {
        // agr text area se adress pass krr rhe toh phir string nhi object hoga type:{}
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    role: { type: Number, default: 0 }

}, { timestamps: true })







// hashing the password (this as the user)
userSchema.pre('save', async function () {
    const user = this;
    if (!user.isModified) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        console.log("Error hashing ", error);
    }

})


// compare the password
userSchema.methods.comparepassword=async function (password){
    // this ke andr sra data aa jata hai
        return bcrypt.compare(password,this.password)
    }
    

// generating jwt token 
// async nhi bhi likho 
userSchema.methods.generateToken = async function () {


    try {
        return jwt.sign(
            {
                // payload
                userID: this._id.toString(),
                email: this.email,
                role: this.role

            },

            // signature
            process.env.JWT_SECRET_KEY,
            // optional things (expire)


            {
                expiresIn: "30d"
            }


        );
    } catch (error) {
        console.log(error);
    }


}



const User = mongoose.model("users", userSchema);

module.exports = User;
