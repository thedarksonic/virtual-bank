const Account = require('../models/Account');

const addFunds = async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    account.balance += amount;
    await account.save();
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const subtractFunds = async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.balance - amount < 0) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    account.balance -= amount;
    await account.save();
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addFunds, subtractFunds };
