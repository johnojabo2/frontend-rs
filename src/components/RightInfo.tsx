import styles from "../styles/Booking.module.scss";
import { Link } from "react-router-dom";

const RightInfo = () => {
  return (
    <div className={styles.right}>
      <div className={styles.img_wrapper}>
        <div>
          <img src="./img_2.png" alt="vector img" />
        </div>
        <h2>Start Booking Now!</h2>
        <p>
          Book your tickets now and enjoy your ride smartly. What are you
          waiting for?
          <Link to="/booking">BOOK NOW</Link>
        </p>
      </div>
    </div>
  );
};

export default RightInfo;
