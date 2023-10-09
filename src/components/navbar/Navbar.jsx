import { useContext } from "react";
import "./navbar.css"
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(user);
  const handleRegister = () => {}

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    

    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">lamabooking</span>
        </Link>
        {user ? user.username : (
          <div className="navItems">
            <button onClick={handleRegister}className="navButton">Register</button>
            <button onClick={handleLogin} className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar