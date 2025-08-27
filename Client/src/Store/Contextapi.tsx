import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../Service/api";
import { Navigate, useNavigate } from "react-router-dom";

type User = {
  id: number;
  username: string;
  email: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  enabled: boolean;
  accoutnExpiredDate: Date;
  roles: Array<string>;
  credentialsNonExpired: boolean;
  credentialsExpiryDate: Date;
  twoFactorEnabled: boolean;
  afnan?: boolean;
};

interface Value {
  admin: boolean;
  afnan: boolean;
  token: string | null;
  currentUser: User | null;
  openSidebar: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setAfnan: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface prop {
  children: ReactNode;
}

const ContextApi = createContext<Value | null>(null);

const ContextProvider = ({ children }: prop) => {
  const gettoken: string | null = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;
  const isAdmin: boolean = localStorage.getItem("isAdmin") === "true";
  const isAfnan: boolean = localStorage.getItem("isAfnan") === "true";

  const [token, setToken] = useState<string | null>(gettoken);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [admin, setAdmin] = useState<boolean>(isAdmin);
  const [afnan, setAfnan] = useState<boolean>(isAfnan);
  console.log("from context" + token);
  // const navigate = useNavigate();

  const isTokenValid = async () => {
    if (token) {
      try {
        await api.get("auth/username");
        // If we get here, the token is valid
        return true;
      } catch (error: any) {
        console.log("Error:", error);
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          setToken(null);
          return false;
        }
      }
    }
    return false;
  };

  const fetchuser = async () => {
    const storeduser = localStorage.getItem("USER");
    const user: User | null = storeduser ? JSON.parse(storeduser) : null;
    if (user?.username) {
      try {
        console.log("hit");

        const response = await api.get("/auth/info", {});
        const role = response.data.roles;
        console.log(response.data.roles);

        if (role.includes("ROLE_ADMIN")) {
          localStorage.setItem("isAdmin", JSON.stringify(true));
          setAdmin(true);
        } else {
          localStorage.removeItem("isAdmin");
          setAdmin(false);
        }

        if (role.includes("ROLE_AFNAN")) {
          console.log("true from is Afnan");

          localStorage.setItem("IS_AFNAN", JSON.stringify(true));
          setAdmin(true);
        } else {
          localStorage.removeItem("IS_AFNAN");
          setAfnan(false);
        }

        setCurrentUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (token != null) {
      isTokenValid();
    }
  }, []);

  useEffect(() => {
    if (token != null) {
      const fetchData = async () => {
        try {
          await fetchuser();
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchData();
    }
  }, [token]);

  return (
    <ContextApi.Provider
      value={{
        admin,
        afnan,
        token,
        currentUser,
        openSidebar,
        setAdmin,
        setAfnan,
        setToken,
        setCurrentUser,
        setOpenSidebar,
      }}
    >
      {" "}
      {children}{" "}
    </ContextApi.Provider>
  );
};

export const MyContext = () => {
  const context = useContext(ContextApi);
  if (!context)
    throw new Error("useMyContext must be used within a ContextProvider");
  return context;
};

export default ContextProvider;
