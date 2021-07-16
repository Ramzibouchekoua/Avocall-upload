import React,{useContext,useState,useEffect} from 'react'
import WrappedNavbar from "./navbar"
import WrappedNavbarConnected from "./navbarConnected"
import WrappedNavbarPro from "./navbarPro"
import UserContext from "../../context/userContext"
import { useHistory } from "react-router-dom";
import MobileNavbar from "./mobileNavbar"


const Navbar = () => {
    const {userData,setUserData}=useContext(UserContext)
    const history = useHistory();
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 820;
  
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleWindowResize);
  
      // Return a function from the effect that removes the event listener
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    const logout =()=>{
        setUserData({
            token:undefined,
            user:undefined
        })
        localStorage.clear()
        console.log("clear ?")
        history.push("/sign-in")
    }
    return  width < breakpoint ? <MobileNavbar user={userData.user} logout={logout}/> : userData.user? userData.user.role==="USER"? <WrappedNavbarConnected logout={logout} userName={userData.user}/>:<WrappedNavbarPro logout={logout} userName={userData.user.name}/>: <WrappedNavbar/>
}

export default Navbar
