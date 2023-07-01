import React from 'react'
import SubmitForm from '../../components/register_login/SubmitForm';

export default function Register() {
  const usernameValidator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Information'))
    } else if (value.length < 4) {
      return Promise.reject(new Error('Must be more than 4 digits'))
    } else if (value.length > 12) {
      return Promise.reject(new Error('Must be less than 12 digits'))
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return Promise.reject(new Error('Must be letter or number'))
    } else {
      return Promise.resolve()
    }
  }
  const passwordValidator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Information'))
    } else if (value.length < 4) {
      return Promise.reject(new Error('Must be more than 4 digits'))
    } else if (value.length > 12) {
      return Promise.reject(new Error('Must be less than 12 digits'))
    } else if (!/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\\@&=])[a-z0-9\\@&=]+$/.test(value)) {
      return Promise.reject(new Error('Must contain letter, number, \\@&='))
    } else {
      return Promise.resolve()
    }
  }

  return (
    <SubmitForm usernameValidator={usernameValidator} passwordValidator={passwordValidator} login={false} />
  )
}