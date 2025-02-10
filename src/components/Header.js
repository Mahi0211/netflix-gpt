import React, { useEffect } from "react";
import Logo from "../assets/logo.png";
import userIcon from "../assets/netflix-profile-icon.jpg";
import dropDownIcon from "../assets/icons8-drop-down-24.png";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
// import { useDispatch } from "react-redux";
// import { removeUser } from "../redux/userSlice";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe(); //cleanup function
  }, []);

  return (
    <div className="absolute w-screen px-[148px] py-6 bg-gradient-to-b from-black z-10 flex justify-between">
      <img src={Logo} alt="Logo" className="w-52" />
      {user && (
        <div
          className="flex text-white items-center gap-2 font-semibold cursor-pointer"
          onClick={toggleDropdown}
        >
          <img
            className="w-10 h-10 rounded-md"
            src={userIcon}
            alt="user-icon"
          />
          <p>{user?.displayName || "Guest"}</p>
          <img className="w-6 h-6" src={dropDownIcon} alt="drop-down-icon" />
        </div>
      )}

      {/* Dropdown menu */}
      {isDropdownVisible && (
        <div className="absolute top-[80px] right-[110px] bg-black border border-gray-700 rounded-lg shadow-lg w-48 text-white">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer border-b-2">
              Manage Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Account
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Help Center
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out of NetflixGPT
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
