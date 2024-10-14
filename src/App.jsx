
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Importing Pages
import Home from "./pages/Home";
import ContactUsPage from "./pages/ContactUs";
import Careers from "./pages/Careers";
import Time from "./pages/Time";
import Ourfounders from "./pages/OurFounders";
import FAQ from "./pages/FAQ";
import Order from "./pages/Order";
import { SiDotenv } from "react-icons/si";
import { GrConfigure } from "react-icons/gr";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./redux/userSlice";
import { auth } from "./firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const location = useLocation();
  const isB2CPage = location.pathname.startsWith("/order");
  const dispatch = useDispatch();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    // Firebase listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && token) {
        
        const phoneNumber = user.phoneNumber;
        dispatch(fetchUserData(phoneNumber));
      } 
    });
  
    
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      {!isB2CPage && <Navbar />}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/timeline" element={<Time />} />
        <Route path="/ourfounders" element={<Ourfounders />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/order/*" element={<Order />} />
      </Routes>

      {!isB2CPage && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Provider store={store}>

  <Router>
    <App />
  </Router>
  </Provider>
);

export default AppWrapper;
