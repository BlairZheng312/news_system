import React from 'react'
import LoginForm from '../../components/loginForm';

export default function Login() {
  const validator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Information'))
    } else {
      return Promise.resolve()
    }
  }

  return (
      <LoginForm usernameValidator={validator} passwordValidator={validator} loginForm={true} />
  )
}




