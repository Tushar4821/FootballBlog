import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className="px-4 py-2 text-[#D1D5DB] font-medium rounded-md transition-all duration-300 hover:bg-[#1E73E8] hover:text-white"
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn