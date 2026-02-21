import React from 'react'
import logo3 from '../assets/logo3.png'

function Logo() {
  return (
    <img 
      src={logo3}
      alt="Logo"
      style={{ width: "250px", height: "70px", objectFit: "contain" }}
    />
  )
}

export default Logo