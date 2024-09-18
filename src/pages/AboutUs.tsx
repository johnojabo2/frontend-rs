import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { resetVerMsgStatus } from "../store/slices/ticket.slice";
import styles from "../styles/Booking.module.scss";
import RightInfo from "../components/RightInfo";
import Navbar from "../components/Navbar";
import { useEffect, memo } from "react";
import Login from "./Login";

const AboutUs = memo(() => {
  const msg = useAppSelector((state) => state.ticket.messageVerify);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(isAuth) document.title = "About Us";
  }, [isAuth]);

  useEffect(() => {
    if (msg) {
      dispatch(resetVerMsgStatus());
    }
  }, [dispatch, msg]);

  if (!isAuth) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex bg-bgColor2">
        <div className={styles.aboutus}>
          <p>
            RideSmart is an innovative and user-friendly application designed
            specifically for students to conveniently book rides between two
            campuses. Developed with the aim of simplifying transportation for
            students, RideSmart provides a reliable and efficient solution to
            meet their commuting needs. With RideSmart, students no longer have
            to worry about navigating public transportation or spending
            excessive time and effort arranging rides with their peers. The
            application offers a seamless and hassle-free booking process,
            ensuring that students can focus on their studies and other
            responsibilities without the added stress of transportation
            logistics. RideSmart revolutionizes student transportation by
            providing a convenient, efficient, and cost-effective solution for
            commuting between campuses. By leveraging technology and
            prioritizing student needs, RideSmart simplifies the transportation
            experience, allowing students to focus on what matters most: their
            education.
          </p>
        </div>
        <RightInfo />
      </div>
    </>
  );
});

export default AboutUs;
