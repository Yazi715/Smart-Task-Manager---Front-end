import { useEffect, useRef } from "react";

function useAutoLogout(onLogout, inactivityLimit = 15 * 60 * 1000) {
  const timer = useRef();

  useEffect(() => {
    function checkTokenExpiry() {
      const expiry = localStorage.getItem("expiry");
      if (expiry && Date.now() > parseInt(expiry, 10)) {
        onLogout();
      }
    }

    function resetTimer() {
      clearTimeout(timer.current);
      checkTokenExpiry();
      timer.current = setTimeout(() => {
        onLogout();
      }, inactivityLimit);
    }

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [onLogout, inactivityLimit]);
}

export default useAutoLogout;
