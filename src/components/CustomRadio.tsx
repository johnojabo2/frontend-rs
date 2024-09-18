import { setIsNext, setSelectedOpt } from "../store/slices/general.slice";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import styles from "../styles/Login.module.scss";
import { FaCheck } from "react-icons/fa";
import { ChangeEvent } from "react";

const CustomRadio = () => {
  const selectedOpt = useAppSelector((state) => state.general.selectedOpt);
  const dispatch = useAppDispatch();
  
  const handleOptionChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    dispatch(setSelectedOpt(value));
  };

  const isDisabled = selectedOpt !== "opt1" && selectedOpt !== "opt2";

  return (
    <>
      <div className={styles.custom_radio}>
        <label
          htmlFor="opt1"
          className={
            selectedOpt === "opt1"
              ? styles.cust_radio_lbl_active
              : styles.cust_radio_lbl
          }
        >
          <img src="./driver.png" alt="driver icon" className="w-6" />
          <div className={styles.label_text}>
            <h3>I am a Driver</h3>
            <p>Select this option if you are a driver!</p>
          </div>
          <div className={styles.check_wrapper}>
            <input
              type="radio"
              id="opt1"
              name="radio-options"
              value="opt1"
              className={styles.checkBox}
              checked={selectedOpt === "opt1"}
              onChange={handleOptionChange}
            />
            <FaCheck
              className={styles.check_icon_radio}
              color={selectedOpt === "opt1" ? "white" : ""}
            />
          </div>
        </label>
        <label
          htmlFor="opt2"
          className={
            selectedOpt === "opt2"
              ? styles.cust_radio_lbl_active
              : styles.cust_radio_lbl
          }
        >
          <img src="./passenger.png" alt="passenger icon" className="w-8" />
          <div className={styles.label_text}>
            <h3>I am a Passenger</h3>
            <p>Select this option if you are a student!</p>
          </div>
          <div className={styles.check_wrapper}>
            <input
              type="radio"
              id="opt2"
              name="radio-options"
              value="opt2"
              className={styles.checkBox}
              checked={selectedOpt === "opt2"}
              onChange={handleOptionChange}
            />
            <FaCheck
              className={styles.check_icon_radio}
              color={selectedOpt === "opt2" ? "white" : ""}
            />
          </div>
        </label>
      </div>
      <button
        className={styles.btn_login}
        disabled={isDisabled}
        onClick={() => dispatch(setIsNext(true))}
      >
        Continue
      </button>
    </>
  );
};

export default CustomRadio;
