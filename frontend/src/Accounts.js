import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/accounts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data);
    };
    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>Sąskaitų sąrašas</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account._id}>
            {account.name} {account.surname} - {account.balance} EUR
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;
