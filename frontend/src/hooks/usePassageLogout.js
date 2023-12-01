import { usePassage } from "@passageidentity/passage-react";
import { GlobalContext } from "../hooks/GlobalContext";
import { useContext } from 'react';

export const usePassageLogout = () => {
  const { getCurrentSession } = usePassage();
  const { updateLoggedin } = useContext(GlobalContext);

  const logout = () => {
    try {
      const currentSession = getCurrentSession();
      if (currentSession) {
        currentSession.signOut();
        updateLoggedin(false);
      }
    } catch (err) {
      // an error occured
    }
  };

  return { logout };
};

export default usePassageLogout;
