import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

import styles from './styles.module.scss';

import { useAuth } from '../../contexts/auth';
import { auth } from '../../services/auth';

export const Login: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<Record<string, string>>({
    username: 'john.doe@example.com',
    password: '123456',
  });

  const handle_login = async (): Promise<void> => {
    const login_information: string = Buffer.from(
      `${form.username}:${form.password}`,
      'utf8',
    ).toString('base64');

    const { token } = await auth.login({ token: login_information });

    localStorage.setItem('@rpg:token', token);

    setToken(token);

    navigate('/');
  };

  const handle_input_change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  return (
    <div className={styles.container}>
      <h1>Login to your Account</h1>

      <label>Username</label>
      <input
        type="username"
        id="username"
        onChange={handle_input_change}
        value={form.username}
        name="username"
      />

      <label>Password</label>
      <input
        type="password"
        id="password"
        onChange={handle_input_change}
        value={form.password}
        name="password"
      />

      <button className={styles.login_button} onClick={handle_login}>
        Login
      </button>
    </div>
  );
};
