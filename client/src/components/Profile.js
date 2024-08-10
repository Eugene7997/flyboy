import { useDispatch, useSelector } from 'react-redux'
import { 
    signOut,
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

    return (
        <div>
            <h1>Welcome {currentUser?.username}</h1>
            <div className='flex gap-2 mt-5'>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}