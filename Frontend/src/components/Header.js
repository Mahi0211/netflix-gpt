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
    <div
      className={`absolute w-screen px-24 max-md:px-5 max-lg:px-7 py-6 max-md:py-5 bg-gradient-to-b from-black flex max-md:flex-col justify-between ${
        showGptSearch ? "z-10" : "z-20"
      }`}
    >
      <img
        src={Logo}
        alt="Logo"
        className="w-52 max-md:w-40 max-md:m-auto max-md:mb-4"
      />
      {user && (
        <div className="flex text-white items-center gap-2 max-sm:gap-5 max-md:gap-16 font-semibold cursor-pointer max-md:m-auto">
          {showGptSearch && (
            <button
              className="px-2 py-2 rounded-md bg-white bg-opacity-30 flex items-center gap-2 hover:bg-opacity-40 shadow-md transition-all duration-300"
              onClick={langDropDown}
            >
              <img
                src={langIcon}
                alt="change-language-icon"
                className="w-6 h-6 max-lg:w-5 max-lg:h-5"
              />
              <img
                className="w-6 h-6 max-lg:w-5 max-lg:h-5 max-md:w-4 max-md:h-4"
                src={dropDownIcon}
                alt="drop-down-icon"
              />
            </button>
          )}
          <button
            className="px-4 py-2 rounded-md bg-white bg-opacity-30 mx-4 flex items-center gap-2 hover:bg-opacity-40 shadow-md transition-all duration-300 max-lg:text-[15px]"
            onClick={handleGptSearchClick}
          >
            {!showGptSearch ? (
              <img src={starIcon} alt="star-icon" className="max-lg:w-5 max-lg:h-5" />
            ) : (
              <img src={backIcon} alt="back-icon" className="w-4 h-4 max-lg:w-3 max-lg:h-3" />
            )}
            {!showGptSearch ? "GPT search" : "Homepage"}
          </button>

          <div
            className="flex items-center gap-2 max-sm:gap-1"
            onClick={toggleDropdown}
          >
            <img
              className="w-10 h-10 max-lg:w-9 max-lg:h-9 rounded-md"
              src={userIcon}
              alt="user-icon"
            />
            <p className="max-lg:text-[15px]">{user?.displayName || "Guest"}</p>
            <img
              className="w-6 h-6 max-md:w-5 max-md:h-5"
              src={dropDownIcon}
              alt="drop-down-icon"
            />
          </div>
        </div>
      )}

      {/* Dropdown menu */}
      {isDropdownVisible && (
        <div className="absolute top-[80px] max-sm:top-[120px] max-md:top-[120px] right-[60px] max-sm:right-[20px] bg-black bg-opacity-90 border border-gray-700 rounded-lg shadow-lg w-48 max-sm:w-44 text-white">
          <ul className="py-2">
            <li className="px-4 max-sm:px-3 py-2 max-sm:py-[6px] hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer border-b-2 max-sm:text-[15px]">
              Manage Profile
            </li>
            <li className="px-4 max-sm:px-3 py-2 max-sm:py-[6px] hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer max-sm:text-[15px]">
              Account
            </li>
            <li className="px-4 max-sm:px-3 py-2 max-sm:py-[6px] hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer max-sm:text-[15px]">
              Help Center
            </li>
            <li
              className="px-4 max-sm:px-3 py-2 max-sm:py-[6px] hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer max-sm:text-[15px]"
              onClick={handleSignOut}
            >
              Sign out of NetflixGPT
            </li>
          </ul>
        </div>
      )}

      {/* Language dropdown */}
      {langDropdownVisible && (
        <div className="absolute top-[80px] max-sm:top-[120px] max-md:top-[120px] right-[400px] max-lg:right-[320px] max-md:right-[480px] max-sm:right-[390px] bg-black bg-opacity-90 border border-gray-700 rounded-lg shadow-lg text-white">
          <ul>
            {LANG_CHANGE.map((lang) => (
              <li
                className="px-10 max-sm:px-6 py-2 max-sm:py-[6px] hover:bg-gray-700 hover:bg-opacity-60 cursor-pointer text-center max-sm:text-[15px]"
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
