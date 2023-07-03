import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import SubmitForm from '../../components/register_login/SubmitForm';

export default function Login() {
  const validator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Information'))
    } else {
      return Promise.resolve()
    }
  }

  const auth = useSelector(state => state.auth)

  return (
    auth.isLogin ?
      <Navigate to={'/'} /> :
      <SubmitForm usernameValidator={validator} passwordValidator={validator} loginForm={true} />
  )
}




