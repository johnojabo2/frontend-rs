import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { resetVerMsgStatus } from "../store/slices/ticket.slice";
import styles from "../styles/Booking.module.scss";
import { verifyTicket } from "../store/actions";
import LoadingBtn from "./LoadingBtn";

const VerifyTicketForm = () => {
  const isLoading = useAppSelector((state) => state.ticket.isLoading);
  const msg = useAppSelector((state) => state.ticket.messageVerify);
  const [isValid, setIsValid] = useState(false);
  const [inputID, setInputID] = useState("");
  const dispatch = useAppDispatch();

  const onInputIDChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputID(value);
    if (value.length === 24 || value.length === 0) {
      setIsValid(false);
    }

    if (msg) {
      dispatch(resetVerMsgStatus());
    }
  };

  useEffect(() => {
    if (inputID) {
      setIsValid(inputID.length !== 24);
    }
  }, [inputID]);

  const isDisabled = !isValid && inputID;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(verifyTicket(inputID));
  };

  return (
    <div className={styles.left}>
      <form>
        <h2>Verify Ticket(s)</h2>
        {/* Ticket ID */}
        <div className={styles.input_wrapper}>
          <label htmlFor="ticketId">Enter Ticket ID</label>
          <input
            id="ticketId"
            type="text"
            value={inputID}
            onChange={onInputIDChange}
          />
          {isValid && <p className={styles.err_msg}>Invalid Ticket ID</p>}
        </div>
        {/* Verify Button */}
        <div className={styles.btn_book_wrapper}>
          {!isLoading ? (
            <button
              className={styles.btn_book}
              onClick={handleSubmit}
              disabled={!isDisabled}
            >
              Verify
            </button>
          ) : (
            <LoadingBtn title="Verifying..." styles={styles.btn_book} />
          )}
        </div>
        {msg && <p className={styles.resp}>{msg}</p>}
      </form>
    </div>
  );
};

export default VerifyTicketForm;
