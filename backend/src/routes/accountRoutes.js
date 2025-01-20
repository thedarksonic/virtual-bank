const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// GET: List of accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find().sort({ ownerSurname: 1 });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Create new account
router.post('/create', async (req, res) => {
  const { ownerName, ownerSurname, personalCode, passportImage } = req.body;

  try {
    // Validate personalCode uniqueness
    const existingAccount = await Account.findOne({ personalCode });
    if (existingAccount) {
      return res.status(400).json({ error: 'Account with this personal code already exists' });
    }

    // Generate random IBAN number (for example, simple placeholder)
    const ibanNumber = `LT${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`;

    const newAccount = new Account({
      ownerName,
      ownerSurname,
      ibanNumber,
      personalCode,
      passportImage
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: Delete account
router.delete('/:id', async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.balance > 0) {
      return res.status(400).json({ error: 'Cannot delete account with positive balance' });
    }

    await account.remove();
    res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
