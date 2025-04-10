import React from 'react';
import firebase from "firebase/compat/app";
import { clearUser } from '../store/slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    console.log("user -> ", user);


    function onLogout() {
        // Add the code to logout the user

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch(clearUser()); // Dispatch action to clear user in Redux store
            })
            .catch((error) => console.error(error));
    }

    const renderUserDetails = () => {
        return <><img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
            <span className="text-lg font-medium">{user.userName}</span>
            <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
                <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            </button>
        </>;
    };

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
            <div className="text-xl font-bold">MyApp</div>
            <div className="flex items-center gap-4">
                {user && renderUserDetails()}
            </div>
        </nav>
    );
};

export default Navbar;

