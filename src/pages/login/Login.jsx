import React from 'react'
import SubmitForm from '../../components/register_login/SubmitForm';

export default function Login() {
  const validator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Information'))
    } else {
      return Promise.resolve()
    }
  }

  return (
      <SubmitForm usernameValidator={validator} passwordValidator={validator} loginForm={true} />
  )
}




