const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  personalCode: { type: String, required: true, unique: true },
  passportPhoto: { type: String, required: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
