import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
function AuthContextProvider(props) {
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [email, setEmail] = useState(null);
  const [img, setImg] = useState(null);
  const [myToken, setMyToken] = useState(null);
  const [myId, setMyId] = useState(null);

  //get the tokey frrom local storage and send to the checking end point to check if its a valid token.
  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token');
    if (token === null) {
      localStorage.setItem('auth-token', '');
      token = '';
    } else setMyToken(token);

    try {
      const tokenRes = await axios.post(
        'http://localhost:5000/api/users/check',
        null,
        {
          headers: { 'x-auth-token': token },
        }
      );
      if (tokenRes.data.valid === true) {
        console.log(tokenRes.data);
        setUsername(tokenRes.data.name);
        setEmail(tokenRes.data.email);
        setIsAdmin(tokenRes.data.isAdmin);
        setImg(tokenRes.data.pic);
        setMyId(tokenRes.data._id);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (err) {
      console.log(err.response.data);
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        username,
        isAdmin,
        img,
        email,
        checkLoggedIn,
        myToken,
        myId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
