import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSignOut } from "../features/user/userSlice";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        history.push("/login");
      }
    });
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Home;
