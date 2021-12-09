import mongoose from 'mongoose';
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
    roles: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    dateOfBirth: string;
    avatar: string;
}
  
// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    roles: string;
    fullName: String;
    email: string;
    password: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    dateOfBirth: string;
    avatar: string;
}
  
const userSchema = new mongoose.Schema({
    roles: {
        type: [{
            type: String,
            enum: ['user', 'chef', 'admin']
        }],
        default: ['user']
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'User phone number required'],
        unique: true
    },
    street: { type: String },
    city: { type: String },
    state: {
        type: String,
        uppercase: true,
        required: [true, "Must write similar to 'FL'"],
        maxlength: 2
    },
    zip: { type: Number },
    dateOfBirth: {
        type: String
        //required: true
    },
    avatar: {
        type: String
    }
},
    {
        timestamps: true
    }
);

userSchema.virtual('address').get(function (this: UserDoc) {
    return this.street + ' ' + this.city + ' ' + this.state + ' ' + this.zip;
});

/**
 * // By naming this instance method toJSON we don't
 * // need to call it for it to run because of our
 * // express res.send or res.json methods calls it for us.
 * @return { name, email, admin, avatar, timestamps }
 */
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

/**
 * // This instance method will generate a user token
 * // and append it to the user.tokens array in the DB
 * @return { token }
 */
 userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
      { _id: user._id , fullname: user.fullName, email: user.email, role: user.roles },
      process.env.JWT_KEY
    );
    return token;
  };
  
  /**
   * // This static method will first find a user by email
   * // and then compare that users password with the
   * // submitted password.
   * // Static methods are run on the actual Model (User), instead
   * // of an instance of a model.
   * @return { user }
   */
  userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Unable to log in.');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Unable to login.');
    return user;
  };
  
  /**
   * // This mongoose middleware will hash our user's passwords
   * // whenever a user is created or a user password is updated.
   * // it doesn't return anything, but calls next instead.  This next
   * // serves the same purpose as the next we have been calling in
   * // express, but it is not the same next.  This one is provided
   * // by mongoose, and the other by express.
   */
  userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password'))
      user.password = await bcrypt.hash(user.password, 8);
  
    next();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};


const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
  
export { User };

