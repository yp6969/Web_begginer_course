const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // hashing
const { isEmail } = require('validator');
const usersSche = mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Please anter an Email that not in the system!'],
    required: [true, 'email is require!'],
    validate: [isEmail, 'Please anter a valid email!'],
  },
  password: { type: String, required: [true, 'password is require!'] },
  dogsList: { type: Array, default: [] },
});
usersSche.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 12, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      console.log(hash);
      next();
    });
  }
});
usersSche.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!');
  }
};
const AllUsers = (module.exports = mongoose.model('All_users', usersSche));
