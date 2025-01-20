const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  ownerSurname: { type: String, required: true },
  ibanNumber: { type: String, unique: true, required: true },
  personalCode: { type: String, unique: true, required: true },
  passportImage: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
