import { createContext, useState, useEffect } from "react";
import * as auth from "./auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const getCurrentUser = async () => {
    try {
      const user = await auth.getCurrentUser();
      console.log("current user", user);
      setUser(user);
    } catch (err) {
      // not logged in
      console.log(err);
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const getAccessToken = async () => {
    try {
      const accessToken = await auth.getAccessToken();
      setAccessToken(accessToken);
    }
    catch (err) {
      console.log(err);
    }
  };

  const signIn = async (username, password) => {
    debugger;
    await auth.signIn(username, password);
    await getCurrentUser();
    await getAccessToken();
  };

  const signOut = async () => {
    auth.signOut();
    setUser(null);
    setAccessToken(null);
  };

  const authValue = {
    user,
    isLoading,
    accessToken,
    signIn,
    signOut,
  };

 

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
