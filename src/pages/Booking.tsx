import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { resetBookMsgStatus } from "../store/slices/ticket.slice";
import TicketDetailModal from "../components/TicketDetailModal";
import VerifyTicketForm from "../components/VerifyTicketForm";
import toast, { Toaster } from "react-hot-toast";
import RightInfo from "../components/RightInfo";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import Navbar from "../components/Navbar";
import { memo, useEffect } from "react";
import Login from "./Login";

const Booking = memo(() => {
  const statusBook = useAppSelector((state) => state.ticket.statusBook);
  const msgBook = useAppSelector((state) => state.ticket.messageBook);
  const role = useAppSelector((state) => state.auth.userData?.role);
  const show = useAppSelector((state) => state.general.showModal);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) document.title = "Booking";
  }, [isAuth]);

  useEffect(() => {
    if (statusBook && msgBook) {
      toast(msgBook, statusBook > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetBookMsgStatus());
    }
  }, [dispatch, msgBook, statusBook]);

  if (!isAuth) {
    navigate("/", { replace: true });
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <Toaster />
      {show && <TicketDetailModal />}
      <div className="w-full flex bg-bgColor2">
        {role === "User" ? <BookForm /> : <VerifyTicketForm />}
        <RightInfo />
      </div>
    </>
  );
});

export default Booking;
