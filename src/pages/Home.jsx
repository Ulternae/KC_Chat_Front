import { Outlet } from "react-router-dom";
import { IconMenu } from "../assets/IconMenu";
import { Menu } from "../components/Menu/Menu";
import { hiddenMenu, openMenu } from "../utils/showMenu";
import { Navbar } from "../components/Navbar";
import { getToken } from "../token";
import { Profile } from "../services/user/profile";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FailedAccess } from "./States/FailedAccces";

const Home = () => {
  const dataUser = useRef("");
  const token = getToken();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stateError, setStateError] = useState({
    error: false,
    message: "",
    type: null,
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        dataUser.current = await Profile({ token, t });
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      } catch (e) {
        setStateError({ error: true, message: e.message, type: e.type });
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      }
    };

    getProfile();
  }, []);

  return (
    <div className="bg-liwr-200 dark:bg-perl-800 px-6 py-6 min-h-screen relative">
      <section className="lg:hidden">
        <div
          className="KC_menuBg z-10 fixed hidden top-0 left-0 bottom-0 right-0 bg-liwr-200/70 dark:bg-perl-800/70"
          onClick={hiddenMenu}
        ></div>
        <IconMenu
          className="absolute left-0 cursor-pointer"
          onClick={openMenu}
        />
      </section>
      <section className="grid lg:grid-cols-[250px_1fr] lg:grid-rows-[40px_1fr] gap-x-16 gap-y-10 ">
        <Menu className="lg:row-span-2" />
        {stateError.error && (
          <>
            <nav></nav>
            <FailedAccess error={stateError} />
          </>
        )}
        {!stateError.error && (
          <>
            <Navbar
              dataUser={dataUser.current}
              loading={loading}
            />
            <Outlet
              context={{
                loading,
                dataUser: dataUser.current,
              }}
            />
          </>
        )}
      </section>
    </div>
  );
};

export { Home };

// setTimeout(() => {
//   setLoading(false);
// }, 5000);
// setTimeout(() => {
//   setStateError({ error: true, message: e.message, type: e.type });
//   setLoading(false);
// }, 5000);
