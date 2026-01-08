import React from 'react'
import Logo from './shared/Logo'
import { Avatar, AvatarImage } from './ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAndClearData } from '@/redux/authSlice' 
// ✅ IMPORT logout action that also clears expenses

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            // ✅ send cookie to backend
            const res = await axios.get(
                "http://localhost:8000/api/v1/user/logout",
                { withCredentials: true }
            )

            if (res.data.success) {
                dispatch(logoutAndClearData()) // 🔥 CLEAR auth + expenses
                toast.success(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "Logout failed")
        }
    }

    return (
        <div className='border-b border-gray-300'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16'>
                <Logo />

                {user ? (
                    <Popover>
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="user"
                                />
                            </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className="w-fit">
                            <Button variant="link" onClick={logoutHandler}>
                                Logout
                            </Button>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <div className='flex items-center gap-2'>
                        <Link to="/login">
                            <Button variant='outline'>Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
