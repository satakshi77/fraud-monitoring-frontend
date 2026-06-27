import { createContext, useState, useEffect } from "react";
import { connectSocket, getSocket } from "../services/socket.js"; 

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});
  const [token, setToken] = useState(() => {
     return localStorage.getItem("token");
  });
  const [globalStream, setGlobalStream] = useState([]);

  useEffect(() => {

    if (token && user) {
      connectSocket(); 
    }
  }, [token,user]);

  const loginUser = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
    connectSocket(); 
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    const socket = getSocket();
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser,setUser,setToken,globalStream,setGlobalStream }}>
      {children}
    </AuthContext.Provider>
  );
}