import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [personalCode, setPersonalCode] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        personalCode,
        password,
      });
      alert('Prisijungta sėkmingai!');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Prisijungimas</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Asmens kodas"
          value={personalCode}
          onChange={(e) => setPersonalCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Prisijungti</button>
      </form>
    </div>
  );
};

export default Login;
