import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import LogoLogin from '../images/logoSVGART.svg';
import './styles/Login.css';

// adicionar posteriormente ao arquivo de constantes e importar aqui:
const MIN_VALUE = 6;

function Login() {
  const [stateEmail, setStateEmail] = useState('');
  const [statePassword, setStatePassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);

  const emailValidation = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const buttonValidation = useCallback(() => {
    if (statePassword.length > MIN_VALUE && emailValidation(stateEmail)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [stateEmail, statePassword]);

  function handleChange({ target }, setState) {
    setState(target.value);
  }

  useEffect(() => {
    buttonValidation();
  }, [buttonValidation, stateEmail, statePassword]);

  function clickButton() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: stateEmail }));
    setIsRedirect(true);
  }

  return (
    <section className="login">
      <img className="logo-login" src={ LogoLogin } alt="Logo Art Yummi Chef" />
      <form>
        <span>Email</span>
        <input
          type="email"
          value={ stateEmail }
          onChange={ (event) => handleChange(event, setStateEmail) }
          data-testid="email-input"
        />
        <span>Password</span>
        <input
          type="password"
          value={ statePassword }
          onChange={ (event) => handleChange(event, setStatePassword) }
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ clickButton }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
        {isRedirect && <Redirect to="/foods" />}
      </form>
    </section>
  );
}

export default Login;
