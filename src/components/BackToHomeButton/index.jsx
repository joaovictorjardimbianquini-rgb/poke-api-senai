import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/backbutton.modules.css";

export default function BackToHomeButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".pokemonContainer");
    if (!container) {
      setVisible(false);
      return;
    }

    function onScroll() {
      // If the info modal is open, always hide the back button
      if (document.querySelector('.info-overlay')) {
        setVisible(false);
        return;
      }
      const top = container.getBoundingClientRect().top;
      setVisible(top < 0);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Also observe DOM changes so opening/closing the modal updates visibility immediately
    const observer = new MutationObserver(() => onScroll());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [location.pathname]);

  function handleClick() {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  }

  return (
    <button
      className={`back-to-home ${visible ? "visible" : "hidden"}`}
      onClick={handleClick}
      aria-label="Voltar para Home"
    >
      Voltar ao Início
    </button>
  );
}
