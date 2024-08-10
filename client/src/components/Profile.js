import { useDispatch, useSelector } from 'react-redux'
import { 
    signOut,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess 
} from '../redux/user/userSlice'


export default function Profile() {
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleSignOut = async () => {
        try {
            await fetch('http://localhost:5000/api/users/sign_out')
            dispatch(signOut())
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart())
            console.log(currentUser._id)
            const res = await fetch(`http://localhost:5000/api/users/delete/${currentUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            const data = await res.json()
            dispatch(deleteUserSuccess(data))
        }
        catch (err) {
            dispatch(deleteUserFailure(err.message))
            console.error(err)
        }
    }
    return (
        <div>
            <h1>Welcome {currentUser?.username}</h1>
            <div className='flex gap-2 mt-5'>
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete user</span>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}