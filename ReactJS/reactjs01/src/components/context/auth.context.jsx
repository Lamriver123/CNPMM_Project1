import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  auth: {
    isAuthenticated: false,
    user: {
      email: "",
      name: "",
    },
  },
  appLoading: true,
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      email: "",
      name: "",
    },
  });

  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const email = localStorage.getItem("user_email");
    const name = localStorage.getItem("user_name");

    if (token && (email || name)) {
      setAuth({
        isAuthenticated: true,
        user: {
          email: email || "",
          name: name || "",
        },
      });
    }

    setAppLoading(false); 
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        appLoading,
        setAppLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
