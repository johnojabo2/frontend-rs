import { resetCanMsgStatus, resetUpdMsgStatus, resetVerMsgStatus } from "../store/slices/ticket.slice";
import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import TicketComponent from "../components/TicketComponent";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useEffect, memo } from "react";
import Login from "./Login";

const Tickets = memo(() => {
  const statusUpd = useAppSelector((state) => state.ticket.statusUpdate);
  const msgUpd = useAppSelector((state) => state.ticket.messageUpdate);
  const statusCancel = useAppSelector((state) => state.ticket.statusCancel);
  const msgVer = useAppSelector((state) => state.ticket.messageVerify);
  const msgCancel = useAppSelector((state) => state.ticket.messageCancel);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) document.title = "Tickets";
  }, [isAuth]);

  useEffect(() => {
    if (statusUpd && msgUpd) {
      toast(msgUpd, statusUpd > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetUpdMsgStatus());
    }
  }, [dispatch, msgUpd, statusUpd]);

  useEffect(() => {
    if (msgVer) {
      dispatch(resetVerMsgStatus());
    }
  }, [dispatch, msgVer]);

  useEffect(() => {
    if (statusCancel && msgCancel) {
      toast(
        msgCancel,
        statusCancel > 201 ? errorToastStyle : successToastStyle
      );
      dispatch(resetCanMsgStatus());
    }
  }, [dispatch, msgCancel, statusCancel]);

  if (!isAuth) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <Toaster />
      <TicketComponent />
    </>
  );
});

export default Tickets;
