import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {

    const navigate = useNavigate()
    const logout = async () => {
        try {
            const res = await fetch('/api/logout')
            if(res.ok){
                toast.success('Logout success')
                navigate('/')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return <button onClick={logout}>Logout</button>
    
}

export default Logout