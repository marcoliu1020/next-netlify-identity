import styles from "@/styles/Guides.module.css";
import React from "react";

import { AuthContext } from "@/stores/authContext";

export default function Guides() {
  const { user, authReady } = React.useContext(AuthContext);
  const [guides, setGuides] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!authReady) return;

    fetch(
      "/.netlify/functions/guides",
      user && {
        headers: {
          Authorization: "Bearer " + user.token.access_token,
        },
      }
    )
      .then(res => {
        if (!res.ok) throw Error("You must be logged in to view this content");
        return res.json();
      })
      .then(data => {
        setError(null);
        setGuides(data);
      })
      .catch(err => {
        setError(err.message);
        setGuides(null);
      });
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides &&
        guides.map(guide => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>written by {guide.author}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At amet totam ipsam
              cupiditate aliquid exercitationem rem eligendi aperiam? Esse, iusto.
            </p>
          </div>
        ))}
    </div>
  );
}
