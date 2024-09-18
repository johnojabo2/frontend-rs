import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { customStyles } from "../utils/select.util";
import styles from "../styles/Booking.module.scss";
import { bookTicket } from "../store/actions";
import { OptionType } from "../interfaces";
import LoadingBtn from "./LoadingBtn";
import Select from "react-select";

const options = [
  { value: "Felele Campus", label: "Felele Campus" },
  { value: "Adankolo Campus", label: "Adankolo Campus" },
];

const BookForm = () => {
  const [selectedVal, setSelectedVal] = useState({ from: '', to: '' });
  const [inputVal, setInputVal] = useState({ seat: 1, amt: 150 });
  const isLoading = useAppSelector((state) => state.ticket.isLoading);
  const [isValid, setIsValid] = useState({
    isValidFrom: false,
    isValidTo: false,
  });
  const labelFromRef = useRef<HTMLLabelElement>(null);
  const labelToRef = useRef<HTMLLabelElement>(null);
  const dispatch = useAppDispatch();
  const selectFromRef = useRef(null);
  const selectToRef = useRef(null);

  const { from, to } = selectedVal;
  const { isValidFrom, isValidTo } = isValid;
  const { seat, amt } = inputVal;

  const onSelectFromChange = (option: OptionType | null) => {
    labelFromRef.current?.classList.add(styles.label_from_blur);
    if (option) {
      setSelectedVal((prev) => ({ from: option.value, to: prev.to }));
    } else {
      labelFromRef.current?.classList.remove(styles.label_from_blur);
      setSelectedVal((prev) => ({ from: "", to: prev.to }));
      setIsValid((prev) => ({
        isValidFrom: false,
        isValidTo: prev.isValidTo,
      }));
    }
  };

  const onSelectToChange = (option: OptionType | null) => {
    labelToRef.current?.classList.add(styles.label_to_blur);
    if (option) {
      setSelectedVal((prev) => ({ from: prev.from, to: option.value }));
    } else {
      labelToRef.current?.classList.remove(styles.label_to_blur);
      setSelectedVal((prev) => ({ from: prev.from, to: "" }));
      setIsValid((prev) => ({
        isValidFrom: prev.isValidFrom,
        isValidTo: false,
      }));
    }
  };

  const onInputSeatChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;

    if (value > 18) {
      return;
    }

    setInputVal(() => ({
      seat: value,
      amt: 150 * value,
    }));
  };

  useEffect(() => {
    // FROM
    if (from) {
      setIsValid((prev) => ({
        isValidFrom: from === to,
        isValidTo: prev.isValidTo,
      }));
    }

    // TO
    if (to) {
      setIsValid((prev) => ({
        isValidFrom: prev.isValidFrom,
        isValidTo: to === from,
      }));
    }
  }, [from, to, isValidFrom, isValidTo]);

  const isDisabled = !isValidFrom && !isValidTo && from && to;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (seat > 18) {
      return;
    }

    dispatch(bookTicket({ from, to, seat: `${seat}`, amount: `${amt}` }));
  };

  return (
    <div className={styles.left}>
      <form>
        <h2>Book Tickets</h2>
        {/* FROM */}
        <div>
          <div className={styles.select_wrapper}>
            <Select
              isClearable
              ref={selectFromRef}
              options={options}
              placeholder=""
              styles={customStyles(isValidFrom, isValidTo)}
              onChange={onSelectFromChange}
            />
            <label ref={labelFromRef} className={styles.label_from}>
              From
            </label>
          </div>
          {isValidFrom && (
            <p className={styles.err_msg}>FROM can't be same with TO</p>
          )}
        </div>
        {/* TO */}
        <div>
          <div className={styles.select_wrapper}>
            <Select
              ref={selectToRef}
              isClearable
              options={options}
              placeholder=""
              styles={customStyles(isValidFrom, isValidTo)}
              onChange={onSelectToChange}
            />
            <label ref={labelToRef} className={styles.label_to}>
              To
            </label>
          </div>
          {isValidTo && (
            <p className={styles.err_msg}>TO can't be same with FROM</p>
          )}
        </div>
        {/* No. of Seats */}
        <div className={styles.input_wrapper}>
          <label htmlFor="seat">No. of Seat(s)</label>
          <input
            id="seat"
            type="number"
            step={1}
            min={1}
            max={18}
            defaultValue={seat}
            onChange={onInputSeatChange}
          />
        </div>
        {/* Amount */}
        <div className={styles.input_wrapper}>
          <label htmlFor="amt">Amount (NGN)</label>
          <input id="amt" type="number" min={100} value={amt} disabled />
        </div>
        {/* Book BTN */}
        <div className={styles.btn_book_wrapper}>
          {!isLoading ? (
          <button
            className={styles.btn_book}
            onClick={handleSubmit}
            disabled={!isDisabled}
          >
            Book
          </button>
        ) : (
          <LoadingBtn title="Booking..." styles={styles.btn_book} />
        )}
        </div>        
      </form>
    </div>
  );
};

export default BookForm;
