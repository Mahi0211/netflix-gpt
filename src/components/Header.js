import React, { useEffect } from "react";
import Logo from "../assets/logo.png";
import userIcon from "../assets/netflix-profile-icon.jpg";
import dropDownIcon from "../assets/icons8-drop-down-24.png";
import starIcon from "../assets/Icons/icons8-stars-material-outlined/icons8-stars-24.png";
import backIcon from "../assets/Icons/icons8-back-32.png";
import langIcon from "../assets/Icons/icons8-language-ios-17-filled/icons8-language-100.png";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { toggleGptSearchView } from "../redux/gptSlice";
import { LANG_CHANGE } from "../utils/constants";
import { changeLanguage } from "../redux/lanChangeSlice";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [langDropdownVisible, setLangDropdownVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const langDropDown = () => {
    setLangDropdownVisible(!langDropdownVisible);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    // toggle gptsearch
    dispatch(toggleGptSearchView());
    setDropdownVisible(false);
  };

  const handleLanguageChange = (selectedLang) => {
    dispatch(changeLanguage(selectedLang));
    setLangDropdownVisible(false);
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
    <div className="absolute w-screen px-24 py-6 bg-gradient-to-b from-black z-20 flex justify-between">
      <img src={Logo} alt="Logo" className="w-52" />
      {user && (
        <div className="flex text-white items-center gap-2 font-semibold cursor-pointer">
          {showGptSearch && (
            <button
              className="px-2 py-2 rounded-md bg-white bg-opacity-30 flex items-center gap-2 hover:bg-opacity-40 shadow-md transition-all duration-300"
              onClick={langDropDown}
            >
              <img
                src={langIcon}
                alt="change-language-icon"
                className="w-6 h-6"
              />
              <img
                className="w-6 h-6"
                src={dropDownIcon}
                alt="drop-down-icon"
              />
            </button>
          )}
          <button
            className="px-4 py-2 rounded-md bg-white bg-opacity-30 mx-4 flex items-center gap-2 hover:bg-opacity-40 shadow-md transition-all duration-300"
            onClick={handleGptSearchClick}
          >
            {!showGptSearch ? (
              <img src={starIcon} alt="start-icon" />
            ) : (
              <img src={backIcon} alt="back-icon" className="w-4 h-4" />
            )}
            {!showGptSearch ? "GPT search" : "Homepage"}
          </button>
          <img
            className="w-10 h-10 rounded-md"
            src={userIcon}
            alt="user-icon"
          />
          <div className="flex gap-2" onClick={toggleDropdown}>
            <p className="">{user?.displayName || "Guest"}</p>
            <img className="w-6 h-6" src={dropDownIcon} alt="drop-down-icon" />
          </div>
        </div>
      )}

      {/* Dropdown menu */}
      {isDropdownVisible && (
        <div className="absolute top-[80px] right-[60px] bg-black bg-opacity-60 border border-gray-700 rounded-lg shadow-lg w-48 text-white">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer border-b-2">
              Manage Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer">
              Account
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer">
              Help Center
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign out of NetflixGPT
            </li>
          </ul>
        </div>
      )}

      {/* Language dropdown */}
      {langDropdownVisible && (
        <div className="absolute top-[80px] right-[400px] bg-black bg-opacity-60 border border-gray-700 rounded-lg shadow-lg text-white">
          <ul>
            {LANG_CHANGE.map((lang) => (
              <li
                className="px-10 py-2 hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer text-center"
                key={lang.identifier}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLanguageChange(lang.identifier);
                }}
              >
                {lang.identifier}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
