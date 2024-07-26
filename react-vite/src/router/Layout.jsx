import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { TranslationProvider } from "../context/Lang";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <TranslationProvider>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Footer />
        <Modal />
      </ModalProvider>
    </TranslationProvider>
  );
}
