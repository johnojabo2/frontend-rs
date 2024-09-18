import { showPrintoutModal, showTicketModal } from "../store/slices/general.slice";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { resetCanSuccess } from "../store/slices/ticket.slice";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import styles from "../styles/TicketModal.module.scss";
import { formatDate } from "../utils/formatdate.util";
import { MdOutlineRemove } from "react-icons/md";
import { cancelTicket } from "../store/actions";
import { useEffect, useState } from "react";
import { CgPrinter } from "react-icons/cg";
import { TiCancel } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import PDFPrintout from "./PDFPrintout";
import LoadingBtn from "./LoadingBtn";
import BackDrop from "./BackDrop";

const TicketDetailModal = () => {
  const ticketArrData = useAppSelector((state) => state.ticket.ticketArrData);
  const showPrintOut = useAppSelector((state) => state.general.showPrintOut);
  const hasError = useAppSelector((state) => state.ticket.errorCan);
  const success = useAppSelector((state) => state.ticket.successCan);
  const isLoading = useAppSelector((state) => state.ticket.isLoading);
  const ticketId = useAppSelector((state) => state.general.ticketId);
  const role = useAppSelector((state) => state.auth.userData?.role);
  const data = ticketArrData?.find((item) => item.id === ticketId);
  const [isCancel, setIsCancel] = useState(false);
  const isPDFViewLoaded = useAppSelector(
    (state) => state.general.isPDFViewLoading
  );
  const dispatch = useAppDispatch();

  const removeLines = Array.from({ length: 15 }, (_, index) => (
    <MdOutlineRemove key={index} className={styles.line} />
  ));

  const handleTicketCancel = (id: string) => {
    if (id) {
      dispatch(cancelTicket(id));
    }
  };

  useEffect(() => {
    if (success || hasError) {
      dispatch(resetCanSuccess());
      setIsCancel(false);
      dispatch(showTicketModal(false));
    }
  }, [dispatch, success, hasError]);

  return (
    <BackDrop>
      <>
        {showPrintOut && <PDFPrintout />}
        {showPrintOut && !isPDFViewLoaded && (
          <button
            className={styles.btn_close}
            onClick={() => dispatch(showPrintoutModal(false))}
          >
            Close
          </button>
        )}
        <div className={styles.ticket_modal}>
          <span
            className={styles.icon_exit}
            onClick={() => dispatch(showTicketModal(false))}
          >
            <MdClose size={25} />
          </span>
          <h3>{data?.id}</h3>
          {isCancel ? (
            <>
              <h2>Are you sure you want to cancel this ticket?</h2>
              <div className={styles.btn_wrapper}>
                {!isLoading ? (
                  <button
                    className={styles.btn_yes}
                    onClick={() => handleTicketCancel(data?.id as string)}
                  >
                    Yes
                  </button>
                ) : (
                  <LoadingBtn title="loading" styles={styles.btn_yes} />
                )}
                <button
                  className={styles.btn_no}
                  onClick={() => setIsCancel(false)}
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <>
              <span className={styles.destination}>
                <p>{data?.from}</p>
                <span className={styles.arrow_head}>
                  {removeLines}
                  <HiOutlineArrowLongRight className={styles.arrow_icon} />
                </span>
                <p>{data?.to}</p>
              </span>
              <div className={styles.items}>
                <div className={styles.label}>
                  <span>Date</span>
                  <span>Seat(s)</span>
                  <span>Amount</span>
                  <span>Status</span>
                  {role === "Driver" && <span>Passenger</span>}
                </div>
                <div className={styles.value}>
                  <span>{formatDate(data?.date as string)}</span>
                  <span>{data?.seat}</span>
                  <span>{data?.amount}</span>
                  <span>{data?.status}</span>
                  {role === "Driver" && <span>{data?.user.matricNo}</span>}
                </div>
              </div>

              <div className={styles.btn_wrapper}>
                <button
                  className={styles.btn_cancel}
                  onClick={() => setIsCancel(true)}
                  disabled={role !== "User" || (data?.status !== "Active" && data?.status !== "Paid")}
                >
                  <TiCancel size={"1.2rem"} className={"mr-1"} /> Cancel
                </button>
                <button
                  className={styles.btn_print}
                  onClick={() => dispatch(showPrintoutModal(true))}
                >
                  <CgPrinter size={"1.2rem"} className="mr-1" /> Print
                </button>
              </div>
            </>
          )}
        </div>
      </>
    </BackDrop>
  );
};

export default TicketDetailModal;
