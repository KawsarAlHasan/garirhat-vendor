import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "./firebaseConfig";
import { API } from "../api/api";
import { message } from "antd";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState(null);
  const provider = new GoogleAuthProvider();

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserInfo(user);

      const response = await API.post("/vendor/verify-token", {
        token: user.accessToken,
      });
      if (response.status === 200) {
        const token = response.data.token;
        // Save token to localStorage
        localStorage.setItem("token", token);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error:", error.message);
      message.error("Something went wrong Please check this");
    } finally {
      setLoading(false);
    }
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    handleGoogle,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
