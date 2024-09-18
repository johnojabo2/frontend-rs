import { RiArrowDropDownLine, RiFolderInfoLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetTicketData } from "../store/slices/ticket.slice";
import { FaSwatchbook, FaUserCircle } from "react-icons/fa";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { resetData } from "../store/slices/auth.slice";
import { CSSTransition } from "react-transition-group";
import animate from "../styles/animate.module.css";
import styles from "../styles/NavBar.module.scss";
import { FiLogOut } from "react-icons/fi";
import { useRef, useState } from "react";
import Logout from "./Logout";

const Navbar = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  const [active, setActive] = useState(false);
  const nodeRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { pathname } = location;
  const link = pathname.split("/")[1];
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/booking", { replace: true });
  };

  const logout = () => {
    dispatch(resetData());
    dispatch(resetTicketData());
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div
          className="inline-flex items-center cursor-pointer w-1/2"
          onClick={goHome}
        >
          <img src="../logo.png" className={styles.logo} alt="Logo" />
          <img src="../logo_2.png" className={styles.logo_1} alt="Logo" />
        </div>
        <ul className={styles.nav_link}>
          <li className={link === "booking" ? styles.nav_li_active : ""}>
            <FaSwatchbook />
            <Link to="/booking">{userData?.role === "Driver" ? "Verifying" : "Booking"}</Link>
          </li>
          <li className={link === "tickets" ? styles.nav_li_active : ""}>
            <MdOutlineAirplaneTicket />
            <Link to="/tickets">Tickets</Link>{" "}
          </li>
          <li className={link === "aboutus" ? styles.nav_li_active : ""}>
            <RiFolderInfoLine />
            <Link to="/aboutus">About Us</Link>
          </li>
        </ul>
        <div className="flex space-x-3 justify-end items-center px-4 w-full md:w-1/2">
          <span className={styles.avatar}>
            {/* <img src={"../assets/img/avatar.png"} alt="avatar" /> */}
            {true ? (
              <FaUserCircle className="h-10 w-10" />
            ) : (
              <img src="" alt="Profile" />
            )}
            <div className={styles.profile_name}>
              <h3>{userData?.firstName}</h3>
              <RiArrowDropDownLine
                className={styles.desktop_dropdownline}
                size={26}
              />
              <RiArrowDropDownLine
                className={styles.mobile_dropdownline}
                size={26}
                onClick={() => setActive((prev) => !prev)}
              />
            </div>
            <Logout />
          </span>
        </div>
      </nav>
      {/* Show on Mobile View */}
      <CSSTransition
        nodeRef={nodeRef}
        in={active}
        mountOnEnter
        unmountOnExit
        timeout={400}
        classNames={{
          enterActive: animate.navBarEnterActive,
          exitActive: animate.navBarExitActive
        }}
      >
        <ul ref={nodeRef} className={styles.nav_link_phone}>
          <li className={link === "booking" ? styles.nav_mobile_li_active : ""}>
            <FaSwatchbook />
            <Link to="/booking">{userData?.role === "Driver" ? "Verifying" : "Booking"}</Link>
          </li>
          <li className={link === "tickets" ? styles.nav_mobile_li_active : ""}>
            <MdOutlineAirplaneTicket />
            <Link to="/tickets">Tickets</Link>{" "}
          </li>
          <li className={link === "aboutus" ? styles.nav_mobile_li_active : ""}>
            <RiFolderInfoLine />
            <Link to="/aboutus">About Us</Link>
          </li>
          <li onClick={logout} className="cursor-pointer">
            <FiLogOut size={20} />
            <span>Logout</span>
          </li>
        </ul>
      </CSSTransition>
    </>
  );
};

export default Navbar;
