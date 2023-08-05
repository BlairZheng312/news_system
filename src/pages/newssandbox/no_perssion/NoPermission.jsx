import React from 'react'
import { Link } from 'react-router-dom';
import './index.scss'

export default function NoPermission() {
  return (
    <div className='no-permission'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to='/home'>Back To Home Page</Link>
    </div>
  )
}
