import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function Auth(props) {
  const isAuth = localStorage.getItem('username')
  const location = useLocation()
  return isAuth ? props.children : <Navigate to={'/login'} state={location} />
}