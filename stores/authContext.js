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
  const [authReady, setAuthReady] = React.useState(false);

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

    netlifyIdentity.on("init", user => {
      setUser(user);
      setAuthReady(true);
      console.log("init event");
    });

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
      netlifyIdentity.off("init");
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  const context = { user, authReady, login, logout };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
