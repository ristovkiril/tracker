const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
})

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")){
        return next();
    }
    try {
        const encryptedPassword = await bcrypt.hash(user.password, 10);
        console.log(encryptedPassword);
        user.password = encryptedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;

    return new Promise(async (resolve, reject) => {
        try {
            const isMatch = await bcrypt.compare(candidatePassword, user.password);
            if (!isMatch) {
                reject("Wrong Email or Password");
            }
            resolve(true);
        } catch (err) {
            reject(err);
        }
    })
}

mongoose.model("User", userSchema);