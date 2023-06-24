import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Auth(props) {
  const isAuth = localStorage.getItem('token')
  return isAuth ? props.children : <Navigate to={'/login'} />
}