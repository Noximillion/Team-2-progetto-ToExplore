import React, { useEffect, useState, useRef, useCallback } from "react";
import Travel from "./Travel.png";
// import prova1 from './prova1.jpg'
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import birdlogo2 from "../images/birdLogo2.png";
import { Link } from "react-router-dom";
import { Loading } from "../Loading";

export function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rptPassword, setRptPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [avatarName, setAvatarName] = useState("");
  const [avatarColor, setAvatarColor] = useState("#166534");
  const [loading, setLoading] = useState(false);
  const showSvgRef = useRef(null);
  const hideSvgRef = useRef(null);
  const showSvgRef2 = useRef(null);
  const hideSvgRef2 = useRef(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleWindowResize = useCallback(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  const notMatchPass = document.getElementById("notMatchPass");

  useEffect(() => {
    console.log({
      username: username,
      mail: email,
      password: password,
      avatar: avatarName,
      color: avatarColor,
    });
  }, [email, username, password, avatarName, avatarColor]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (
      email !== "" &&
      username !== "" &&
      password !== "" &&
      rptPassword !== "" &&
      avatarName !== ""
    ) {
      if (rptPassword !== password) {
        notMatchPass.style.display = "block";
      } else {
        fetch("http://localhost:3001/login/post", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            mail: email,
            password: password,
            avatar: avatarName,
            color: avatarColor,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((res) => res.json())
          .then((json) => {
            alert(json.text);
            setTimeout(() => {
              if (json.text === "Registrazione completata con successo") {
                window.location.href = "/";
              }
            }, 1000);
          });
      }
    }
  };

  const isDisabled =
    email === "" ||
    username === "" ||
    password === "" ||
    rptPassword === "" ||
    avatarName === "";

  const changeSvgIcon = () => {
    if (
      showSvgRef.current.style.display === "block" &&
      hideSvgRef.current.style.display === "none"
    ) {
      showSvgRef.current.style.display = "none";
      hideSvgRef.current.style.display = "block";
      setShowPassword(false);
    } else {
      showSvgRef.current.style.display = "block";
      hideSvgRef.current.style.display = "none";
      setShowPassword(true);
    }
  };

  const changeSvgIcon2 = () => {
    if (
      showSvgRef2.current.style.display === "block" &&
      hideSvgRef2.current.style.display === "none"
    ) {
      showSvgRef2.current.style.display = "none";
      hideSvgRef2.current.style.display = "block";
      setShowPassword2(false);
    } else {
      showSvgRef2.current.style.display = "block";
      hideSvgRef2.current.style.display = "none";
      setShowPassword2(true);
    }
  };

  const handleNameChange = (event) => {
    const name = event.target.value.trim().substring(0, 2);
    const uppercaseName = name.toUpperCase();
    setAvatarName(uppercaseName);
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    setAvatarColor(color);
  };

  const ResponsiveAvatar = styled(Avatar)(({ theme }) => ({
    bgcolor: avatarColor,
    [theme.breakpoints.up("xs")]: {
      width: "40px",
      height: "40px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60px",
      height: "60px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "80px",
      height: "80px",
    },
  }));

  return (
    <div className="min-h-screen h-full w-full bg-primary bg-opacity-70">
      {loading && <Loading />}
      <div
        className="z-20 flex flex-col items-center gap-6 pt-2
            md:justify-start md:pt-8
            lg:gap-8 lg:pt-12"
      > {windowHeight > 550 && (
        <div className="flex flex-col jusify-center items-center
        md:gap-8">
          <img className="w-28" src={birdlogo2} alt="" />
          <h1
            className="text-white text-center font-bold
                md:text-2xl md:font-bold
                lg:text-6xl lg:font-extrabold lg:text-white"
          >
            ToExplore
          </h1>
          <h2
            className="text-2xl font-extrabold w-52 text-center
                md:w-full md:text-center md:text-3xl lg:w-auto lg:text-2xl lg:text-black"
          >
            Register here!
          </h2>
          <p
            className="text-xs w-80 text-center
                md:w-full md:text-center md:text-base
                 lg:w-auto lg:text-base lg:text-black "
          >
            Become part of our community
          </p>
        </div>
      )}
        <div
          className="z-10 bg-white/90 w-80 h-2/5 rounded-lg flex flex-col items-center gap-3 min-h-[282px] min-w-[320px] max-w-[320px]
                md:w-4/6 md:h-1/2 md:min-h-[438px] md:min-w-[678px] md:flex md:flex-col md:gap-5
                lg:w-2/5 lg:h-3/5 lg:rounded-3xl lg:opacity-95 lg:min-w-[745px] lg:max-w-[745px] justify-center"
        >
          <input
            className="border-2 border-t-0 border-x-0 border-b-lime-400 focus:outline-none focus:border-b-lime-800 bg-transparent w-64 flex justify-center
                        md:text-2xl md:w-5/6
                        lg:w-4/5 lg:text-2xl lg:h-12"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border-2 border-t-0 border-x-0 border-b-lime-400 focus:outline-none focus:border-b-lime-800 bg-transparent w-64 flex justify-center
                        md:text-2xl md:w-5/6
                        lg:w-4/5 lg:text-2xl lg:h-12"
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className="flex border-2 border-t-0 border-x-0 border-b-lime-400 focus:outline-none focus:border-b-lime-800 bg-transparent flex justify-center w-64 justify-between
                    md:w-5/6 md:text-2xl  md:justify-start md:justify-between
                    lg:w-4/5 lg:text-2xl lg:h-12  lg:justify-start lg:justify-between"
          >
            <input
              className="bg-transparent"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              ref={hideSvgRef}
              id="hideSvg"
              className="
                    md:w-14 md:h-8
                    lg:w-14 lg:h-8"
              onClick={changeSvgIcon}
            >
              <svg
                className="md:w-14 md:h-8
                            lg:w-14 lg:h-8"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5.70711 19.7071L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071Z"
                  fill="#000000"
                />
                <path
                  d="M12 5C13.2011 5 14.394 5.21361 15.5362 5.63535L13.9368 7.23482C13.2953 7.0777 12.6458 7 12 7C9.07319 7 6.06862 8.59614 4.09173 11.9487C4.74631 13.0987 5.52178 14.046 6.37447 14.7971L4.95845 16.2131C3.88666 15.248 2.93477 14.037 2.16029 12.5876C1.94361 12.1821 1.94637 11.6844 2.17003 11.2807C4.45796 7.15186 8.18777 5 12 5Z"
                  fill="#000000"
                />
                <path
                  d="M12 9C12.056 9 12.1117 9.00154 12.167 9.00457L9.00457 12.167C9.00154 12.1117 9 12.056 9 12C9 10.3431 10.3431 9 12 9Z"
                  fill="#000000"
                />
                <path
                  d="M14.9954 11.833L11.833 14.9954C11.8883 14.9985 11.944 15 12 15C13.6569 15 15 13.6569 15 12C15 11.944 14.9985 11.8883 14.9954 11.833Z"
                  fill="#000000"
                />
                <path
                  d="M12 17C11.355 17 10.7061 16.9216 10.0654 16.763L8.46807 18.3604C9.60812 18.7849 10.7998 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807C21.0543 9.88089 20.1128 8.7083 19.0587 7.76977L17.6421 9.18635C18.4837 9.91776 19.2525 10.8366 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                  fill="#000000"
                />
              </svg>
            </button>
            <button
              ref={showSvgRef}
              id="showSvg"
              className="hidden
                    md:w-14 md:h-8 md:hidden
                    lg:w-14 lg:h-8 lg:hidden"
              onClick={changeSvgIcon}
            >
              <svg
                className="md:w-14 md:h-8
                         lg:w-14 lg:h-8"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
                  fill="#000000"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>
          <div
            className="flex border-2 border-t-0 border-x-0 border-b-lime-400 focus:outline-none focus:border-b-lime-800 bg-transparent flex justify-center w-64 justify-between
                    md:w-5/6 md:text-2xl md:items-center md:justify-between
                    lg:w-4/5 lg:text-2xl lg:h-12  lg:justify-start lg:justify-between "
          >
            <input
              className="bg-transparent"
              type={showPassword2 ? "text" : "password"}
              placeholder="Repeat Password"
              value={rptPassword}
              onChange={(e) => setRptPassword(e.target.value)}
            />
            <button
              ref={hideSvgRef2}
              id="hideSvg2"
              className="
                    md:w-14 md:h-8
                    lg:w-14 lg:h-8"
              onClick={changeSvgIcon2}
            >
              <svg
                className="md:w-14 md:h-8
                         lg:w-14 lg:h-8"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5.70711 19.7071L19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071Z"
                  fill="#000000"
                />
                <path
                  d="M12 5C13.2011 5 14.394 5.21361 15.5362 5.63535L13.9368 7.23482C13.2953 7.0777 12.6458 7 12 7C9.07319 7 6.06862 8.59614 4.09173 11.9487C4.74631 13.0987 5.52178 14.046 6.37447 14.7971L4.95845 16.2131C3.88666 15.248 2.93477 14.037 2.16029 12.5876C1.94361 12.1821 1.94637 11.6844 2.17003 11.2807C4.45796 7.15186 8.18777 5 12 5Z"
                  fill="#000000"
                />
                <path
                  d="M12 9C12.056 9 12.1117 9.00154 12.167 9.00457L9.00457 12.167C9.00154 12.1117 9 12.056 9 12C9 10.3431 10.3431 9 12 9Z"
                  fill="#000000"
                />
                <path
                  d="M14.9954 11.833L11.833 14.9954C11.8883 14.9985 11.944 15 12 15C13.6569 15 15 13.6569 15 12C15 11.944 14.9985 11.8883 14.9954 11.833Z"
                  fill="#000000"
                />
                <path
                  d="M12 17C11.355 17 10.7061 16.9216 10.0654 16.763L8.46807 18.3604C9.60812 18.7849 10.7998 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807C21.0543 9.88089 20.1128 8.7083 19.0587 7.76977L17.6421 9.18635C18.4837 9.91776 19.2525 10.8366 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                  fill="#000000"
                />
              </svg>
            </button>
            <button
              ref={showSvgRef2}
              id="showSvg2"
              className="hidden
                    md:w-14 md:h-8 md:hidden
                    lg:w-14 lg:h-8 lg:hidden"
              onClick={changeSvgIcon2}
            >
              <svg
                className="md:w-14 md:h-8
                         lg:w-14 lg:h-8"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
                  fill="#000000"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                  fill="#000000"
                />
              </svg>
            </button>
          </div>
          <p
            id="notMatchPass"
            className="text-red-500 text-xs w-64 hidden
                    md:text-base md:w-5/6
                    lg:text-base lg:w-4/5"
          >
            Password does not match
          </p>
          <div
            className="flex items-center justify-center w-64 justify-between
                    md:flex md:w-5/6 md:justify-between
                    lg:flex lg:w-4/5 lg:justify-between"
          >
            <input
              className="border-2 border-t-0 border-x-0 border-b-lime-400 focus:outline-none focus:border-b-lime-800  bg-transparent w-24 flex
                            md:w-1/4 md:text-2xl
                            lg:w-36
                            "
              type="text"
              placeholder="Avatar name"
              value={avatarName}
              onChange={handleNameChange}
            />
            <input
              className="
                            md:w-20
                            lg:h-10"
              type="color"
              value={avatarColor}
              onChange={handleColorChange}
            />
            <Stack
              className="
                        "
            >
              <ResponsiveAvatar sx={{ bgcolor: [avatarColor], width: 40, height: 40 }}>
                {avatarName}
              </ResponsiveAvatar>
            </Stack>
          </div>
          <button
            className="bg-green-800 w-64 h-7 flex justify-center border border-green-800 text-white rounded-full
                        md:w-5/6 md:h-12 md:text-4xl
                        lg:w-4/5 lg:h-14 lg:text-4xl lg:rounded-full lg:cursor-pointer"
            disabled={isDisabled}
            onClick={handleLogin}
          >
            Register
          </button>
          <Link
            to="/"
            className="flex text-xs w-72 justify-center
                        md:text-xl md:w-5/6 md:text-center
                        lg:w-4/5 lg:h-12 lg:text-2xl"
          >
            <p>Do you already have an account? Login!</p>
          </Link>
        </div>
        <img
          src={Travel}
          alt=""
          className="w-80 max-w-[320px] h-56 fixed bottom-0
                md:h-1/4 md:fixed md:bottom-0 md:w-4/6 md:min-w-[678px]
                lg:hidden"
        />
      </div>
    </div>
  );
}
