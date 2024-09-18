import { resetTicketData } from "../store/slices/ticket.slice";
import { resetData } from "../store/slices/auth.slice";
import { useAppDispatch } from "../hooks/store.hook";
import styles from "../styles/NavBar.module.scss";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Logout = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(resetData());
    dispatch(resetTicketData());
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.desktop_logout} onClick={logout}>
      <FiLogOut size={20} />
      <h1>Logout</h1>
    </div>
  );
};

export default Logout;
