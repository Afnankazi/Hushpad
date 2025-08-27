import React from "react";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyNotes from "./pages/MyNotes";
import CreateNotes from "./pages/CreateNotes";
import Protectedroutes from "./Components/Protectedroutes";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { Toaster } from "react-hot-toast";
import ContextProvider from "./Store/Contextapi"; // Import ContextProvider

function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <ContextProvider>
          <Header />
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 8000,
              removeDelay: 1000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              loading: {
                duration: Infinity,
              },
              success: {
                duration: 2000,
                iconTheme: {
                  primary: 'blue',
                  secondary: 'black',
                },
              },
              error: {
                duration: 2000,
                iconTheme: {
                  primary: 'red',
                  secondary: 'black',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/notes"
              element={
                <Protectedroutes>
                  <MyNotes />
                </Protectedroutes>
              }
            />
            <Route
              path="/create-notes"
              element={
                <Protectedroutes>
                  <CreateNotes />
                </Protectedroutes>
              }
            />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
