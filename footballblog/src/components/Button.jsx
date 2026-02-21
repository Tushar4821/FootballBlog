import React from 'react'

function Button({children,type = 'button',bgColor = 'bg-blue-600', textColor='text-white',className='',...props}) {
  return ( 
    <button type={type} className={`px-3 rounded-xl py-2 ${className} ${textColor} ${bgColor}`} {...props}> {children} </button>
  )
}

export default Button