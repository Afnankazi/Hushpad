import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Import all the necessary building blocks from your Aceternity UI file
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "./ui/resizable-navbar"; // Adjust this path if needed
import { MyContext } from "../Store/Contextapi";

export default function NavbarDemo() {
  const { token, setToken, admin, setAfnan, setCurrentUser, setAdmin } =
    MyContext();
  const nav = useNavigate();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Contact", link: "/contact" },
    { name: "About", link: "/about" },
  ];
  const navItemsLogin = [
    { name: "My Notes", link: "/notes" },
    { name: "Create Notes", link: "/create-notes" },
    { name: "Profile", link: "/profile" },
  ];
  const navItemsAdmin = [{ name: "admin", link: "/admin" }];

  let itemTOShow = token ? [...navItems, ...navItemsLogin] : navItems;
  itemTOShow = admin ? [...itemTOShow, ...navItemsAdmin] : itemTOShow;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log(token);

  const handellogout = () => {
    nav("/login");
     setTimeout(() => {
    localStorage.clear();
    setToken(null);
    setAdmin(false);
    setAfnan(false);
    setCurrentUser(null);
  }, 0);
  };


  const NavigationItem = ({ name, link }: { name: string; link: string }) => (
    <span
      onClick={() => nav(link)}
      className="cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100"
    >
      {name}
    </span>
  );

  return (
    <div>
      <Navbar>
        <NavBody>
          <NavbarLogo />

          {/* Desktop Navigation */}
          <NavItems
            items={itemTOShow}
            onNavigate={(link) => {
              nav(link);
              setIsMobileMenuOpen(false);
            }}
          />

          {/* Auth Buttons */}
          {token ? (
            <div className="flex items-center gap-4">
              <NavbarButton onClick={handellogout} variant="primary">
                Logout
              </NavbarButton>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavbarButton onClick={() => nav("/login")} variant="secondary">
                Login
              </NavbarButton>
              <NavbarButton onClick={() => nav("/signup")} variant="primary">
                Sign Up
              </NavbarButton>
            </div>
          )}
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex flex-col gap-4">
              {itemTOShow.map((item) => (
                <NavigationItem
                  key={item.link}
                  name={item.name}
                  link={item.link}
                />
              ))}
              <div className="flex flex-col gap-2 pt-4">
                {!token && (
                  <>
                    <NavbarButton
                      onClick={() => {
                        nav("/login");
                        setIsMobileMenuOpen(false);
                      }}
                      variant="secondary"
                      className="w-full"
                    >
                      Login
                    </NavbarButton>
                    <NavbarButton
                      onClick={() => {
                        nav("/signup");
                        setIsMobileMenuOpen(false);
                      }}
                      variant="primary"
                      className="w-full"
                    >
                      Sign Up
                    </NavbarButton>
                  </>
                )}
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
