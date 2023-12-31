import { Link } from "react-router-dom";
import ButtonPrev from "./ButtonPrev";
import { Navbar } from "./Navbar";
import { useContext } from "react";
// import { useEffect } from "react";
import LanguageContext from "./LanguageContext";
// import { Select } from "@mui/material";

export function Settings({ setUserlogged }) {
  const { languageApp, SetLanguageApp } = useContext(LanguageContext);
  const languages = {
    selectLanguages:
      languageApp === "it" ? "Seleziona la lingua" : "Select Language",
    changeColor:
      languageApp === "it"
        ? "Scegli il colore dell'avatar"
        : "Change avatar Color",
    team: languageApp === "it" ? "Il nostro Team" : "Our Team",
    logout: languageApp === "it" ? "Esci" : "Logout",
  };
  let selectLanguage = (evt) => {
    SetLanguageApp(evt.target.value);
  };

  return (
    <div className="h-screen w-screen bg-primary bg-opacity-75">
      <Link to="/homepage">
        <ButtonPrev />
      </Link>
      <div className="flex flex-col h-4/5 justify-around items-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <label
            className="justify-center text-3xl flex flex-wrap w-full
                md:text-3xl gap-3"
            for="language"
          >
            {languages.selectLanguages}
          </label>
          <select
            value={languageApp}
            onChange={selectLanguage}
            className="bg-primary border border-gray-300 text-gray-900 text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 "
            id="language"
            // name="language"
          >
            <option value="it">Italiano</option>
            <option value="en">English</option>
          </select>
        </div>

        <Link to="/changeAvatarColor" className="md:w-full">
          <p
            className="text-center text-3xl w-full
                    md:text-5xl"
          >
            {languages.changeColor}
          </p>
        </Link>
        <Link to="/team" className="md:w-full">
          <p
            className="text-center text-3xl w-full
                    md:text-5xl"
          >
            {languages.team}
          </p>
        </Link>
        <button
          onClick={() => {
            sessionStorage.removeItem("User");
            setUserlogged({ logged: false });
          }}
          className="text-center text-3xl w-full
                md:text-5xl"
        >
          {languages.logout}
        </button>
      </div>
      <Navbar />
    </div>
  );
}
