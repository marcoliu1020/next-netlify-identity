import React from "react";
import netlifyIdentity from "netlify-identity-widget";

export const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  // open modal
  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  React.useEffect(() => {
    // init netlitfy identity connection
    netlifyIdentity.init();

    netlifyIdentity.on("login", user => {
      setUser(user);
      netlifyIdentity.close(); // close modal
      console.log("login event");
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const context = { user, login, logout };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
