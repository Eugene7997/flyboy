import { useDispatch, useSelector } from 'react-redux'

export default function Profile() {
    const { currentUser } = useSelector(state => state.user)

    return (
        <div>
            <h1>Welcome {currentUser?.username}</h1>
        </div>
    )
}