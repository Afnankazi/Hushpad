
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
  NavbarButton
} from "./ui/resizable-navbar"; // Adjust this path if needed
import { MyContext } from "../Store/Contextapi";



export default function NavbarDemo() {

  const {token , setToken , admin , setAfnan , setCurrentUser , setAdmin} = MyContext();
  // const nav = useNavigate();




  const navItems = [
    { name: "Home", link: "#features" },
     { name: "Contact", link: "#pricing" },
    { name: "About", link: "#pricing" },
  ];
  const navItemsLogin = [
    { name: "My Notes", link: "#features" },
    { name: "Create Notes", link: "#pricing" },
    { name: "Profile", link: "#contact" },

  ]
  const navItemsAdmin = [
    { name: "admin", link: "#features" },
 

  ]
    
     let itemTOShow = token ? [...navItems , ...navItemsLogin ] : navItems
     itemTOShow = admin ? [...itemTOShow ,...navItemsAdmin ] : itemTOShow

 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log(token);
  

  const handellogout = () =>{
    localStorage.clear();
    setToken(null);
    setAdmin(false);
    setAfnan(false)
    setCurrentUser(null);
    // nav("/login")
  }

  return (
   
    <div >
      <Navbar>

          <NavBody>
             <NavbarLogo />
          
      
              <NavItems items={itemTOShow} />

              {token ?(<div className="flex items-center gap-4">
                <NavbarButton as="a" onClick={handellogout} variant="primary">
                  Logout
                </NavbarButton>

              </div>)
             : (<div className="flex items-center gap-4">
                <NavbarButton as="a" variant="secondary">
                  Login
                </NavbarButton>
                <NavbarButton as="a" href="#signup" variant="primary">
                  Sign Up
                </NavbarButton>
              </div>)

              }
          
         

        </NavBody>


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
                    <a key={item.link} href={item.link} className="text-neutral-600 dark:text-neutral-300">
                        {item.name}
                    </a>
                ))}
                <div className="flex flex-col gap-2 pt-4">
                    <NavbarButton href="#login" as="a" variant="secondary" className="w-full">
                        Login
                    </NavbarButton>
                    <NavbarButton href="#signup" as="a" variant="primary" className="w-full">
                        Sign Up
                    </NavbarButton>
                </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

   
    </div>
  );
}
