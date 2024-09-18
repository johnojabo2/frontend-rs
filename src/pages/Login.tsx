import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { resetAuthMsgStatus, resetRegMsgStatus } from "../store/slices/auth.slice";
import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import { setIsNext, setSelectedOpt } from "../store/slices/general.slice";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { AiOutlineUnlock, AiOutlineLock } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { loginDriver, loginUser } from "../store/actions";
import CustomRadio from "../components/CustomRadio";
import LoadingBtn from "../components/LoadingBtn";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/Login.module.scss";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const selectedOpt = useAppSelector((state) => state.general.selectedOpt);
  const msgReg = useAppSelector((state) => state.auth.messageReg);
  const statusReg = useAppSelector((state) => state.auth.statusReg);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isNext = useAppSelector((state) => state.general.isNext);
  const success = useAppSelector((state) => state.auth.success);
  const message = useAppSelector((state) => state.auth.message);
  const status = useAppSelector((state) => state.auth.status);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [showPwd, setShowPwd] = useState<boolean>(true);
  const labelPwdRef = useRef<HTMLLabelElement>(null);
  const labelEmailRef = useRef<HTMLLabelElement>(null);
  const inputPwdRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    emailInput: "",
    matricInput: "",
    passwordInput: "",
  });
  const [isValidInput, setIsValidInput] = useState({
    email: false,
    matric: false,
  });
  const matricRegex = useMemo(
    () => /^([a-zA-Z]{3}\d{2}[a-zA-Z]{3}\d{3,})$/,
    []
  );
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const handleInputOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelEmailRef.current?.classList.add(styles.label_email_blur);

    // Driver User
    if (selectedOpt === "opt1") {
      setInputValue((prev) => ({
        matricInput: prev.matricInput,
        emailInput: value,
        passwordInput: prev.passwordInput,
      }));

      if (value.length >= 1) {
        setIsValidInput((prev) => ({
          matric: prev.matric,
          email: !emailRegex.test(value),
        }));
      }
    }

    // Passenger User (Student)
    if (selectedOpt === "opt2") {
      setInputValue((prev) => ({
        matricInput: value,
        emailInput: prev.emailInput,
        passwordInput: prev.passwordInput,
      }));

      if (value.length >= 1) {
        setIsValidInput((prev) => ({
          matric: !matricRegex.test(value),
          email: prev.email,
        }));
      }
    }
  };

  const handleInputPwdOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelPwdRef.current?.classList.add(styles.label_pwd_blur);

    setInputValue((prev) => ({
      emailInput: prev.emailInput,
      matricInput: prev.matricInput,
      passwordInput: value,
    }));
  };

  const handleOnChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(evt.target.checked);
  };

  const handleGoBack = () => {
    // Reset and go back to previous screen
    setInputValue({ emailInput: "", matricInput: "", passwordInput: "" });
    setIsValidInput({ email: false, matric: false });
    dispatch(setSelectedOpt(""));
    setIsChecked(false);
    dispatch(setIsNext(false));
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    //For Input Email
    const handleInputBlur = () => {
      if (labelEmailRef.current && inputEmailRef.current) {
        labelEmailRef.current.classList.add(styles.label_email_blur);
        const value = inputEmailRef.current.value;
        // Driver User
        if (selectedOpt === "opt1") {
          if (value.length >= 1) {
            setIsValidInput((prev) => ({
              email: !emailRegex.test(value),
              matric: prev.matric,
            }));
          }

          if (value.length === 0) {
            labelEmailRef.current.classList.remove(styles.label_email_blur);
            setIsValidInput((prev) => ({
              email: false,
              matric: prev.matric,
            }));
          }
        }

        // Passenger User
        if (selectedOpt === "opt2") {
          if (value.length >= 1) {
            setIsValidInput((prev) => ({
              email: prev.email,
              matric: !matricRegex.test(value),
            }));
          }

          if (value.length === 0) {
            labelEmailRef.current.classList.remove(styles.label_email_blur);
            setIsValidInput((prev) => ({
              email: prev.email,
              matric: false,
            }));
          }
        }
      }
    };

    // For Input Password
    const handleInputPwdBlur = () => {
      if (labelPwdRef.current && inputPwdRef.current) {
        labelPwdRef.current.classList.add(styles.label_pwd_blur);

        if (inputPwdRef.current.value.length === 0) {
          labelPwdRef.current.classList.remove(styles.label_pwd_blur);
        }
      }
    };

    const inputEmail = document.querySelector("#email");
    inputEmail?.addEventListener("blur", handleInputBlur);

    const inputPwd = document.querySelector("#password");
    inputPwd?.addEventListener("blur", handleInputPwdBlur);

    return () => {
      inputEmail?.removeEventListener("blur", handleInputBlur);
      inputPwd?.removeEventListener("blur", handleInputPwdBlur);
    };
  }, [emailRegex, matricRegex, selectedOpt, isValidInput]);

  const { email, matric } = isValidInput;
  const { emailInput, matricInput, passwordInput } = inputValue;
  const isDisabled =
    ((emailInput !== "" && !email) || (matricInput !== "" && !matric)) &&
    passwordInput !== "";

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (selectedOpt === "opt1") {      
      dispatch(loginDriver({ email: emailInput, password: passwordInput }));
    }

    if (selectedOpt === "opt2") {
      dispatch(loginUser({ matricNo: matricInput, password: passwordInput }));
    }

    return;
  };

  useEffect(() => {
    if (status) {
      toast(message, status > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetAuthMsgStatus());
    }

    if (statusReg) {
      toast(msgReg, statusReg > 201 ? errorToastStyle : successToastStyle);
      dispatch(resetRegMsgStatus());
    }
   
    if (success && isAuth) {
      navigate("/booking");
    }
  }, [dispatch, navigate, success, isAuth, message, status, statusReg, msgReg]);

  return (
    <>
      <Toaster />
      <div className={styles.login}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src="logo.png" alt="logo" />
          </div>
          <div className={styles.image}>
            <img src="../img_4.png" alt="Bus Stop Vector" />
          </div>
        </div>
        <div className={styles.right}>
          <form className={styles.form_login}>
            <div className={styles.img_container}>
              <img src="../logo_2.png" alt="logo" />
            </div>
            <h2>{isNext ? "Hello Again!" : "Please Select an Option"}</h2>
            <p className={styles.are_you}>
              {isNext
                ? "Welcome back, please login"
                : "Are you a Driver or Passenger?"}
            </p>
            {isNext ? (
              <>
                <div
                  className={
                    email || matric
                      ? styles.input_container_err
                      : styles.input_container
                  }
                >
                  <input
                    type={selectedOpt === "opt1" ? "email" : "text"}
                    name="email"
                    id="email"
                    ref={inputEmailRef}
                    value={selectedOpt === "opt1" ? emailInput : matricInput}
                    onChange={handleInputOnChange}
                    className={
                      email || matric ? styles.input_err : styles.input_email
                    }
                    required
                  />
                  <label
                    ref={labelEmailRef}
                    htmlFor="email"
                    style={{ color: email || matric ? "#DC2626" : "" }}
                    className={styles.label_email}
                  >
                    {selectedOpt === "opt1" ? "Email" : "Matric No"}
                  </label>
                </div>
                {email && (
                  <p className={styles.err_msg}>Invalid Email address</p>
                )}
                {matric && <p className={styles.err_msg}>Invalid Matric No.</p>}
                <div className={styles.input_container}>
                  <input
                    type={showPwd ? "password" : "text"}
                    name="password"
                    id="password"
                    ref={inputPwdRef}
                    className={styles.input_pwd}
                    value={passwordInput}
                    onChange={handleInputPwdOnChange}
                    required
                  />
                  <label
                    ref={labelPwdRef}
                    htmlFor="password"
                    className={styles.label_pwd}
                  >
                    Password
                  </label>
                  {showPwd ? (
                    <label htmlFor="password" className={styles.label_lock}>
                      <AiOutlineLock
                        className={styles.icon_lock}
                        size={20}
                        onClick={() => setShowPwd((prev) => !prev)}
                      />
                    </label>
                  ) : (
                    <label htmlFor="password" className={styles.label_unlock}>
                      <AiOutlineUnlock
                        className={styles.icon_unlock}
                        size={20}
                        onClick={() => setShowPwd((prev) => !prev)}
                      />
                    </label>
                  )}
                </div>
                <div className={styles.readme}>
                  <div>
                    <div className={styles.check_wrapper}>
                      <input
                        id="remember"
                        aria-describedby="remember"
                        name="remember"
                        type="checkbox"
                        className={styles.checkBox}
                        checked={isChecked}
                        onChange={handleOnChecked}
                      />
                      <label
                        htmlFor="remember"
                        className={styles.check_icon_label}
                      >
                        <FaCheck
                          className={styles.check_icon}
                          color={isChecked ? "white" : ""}
                        />
                      </label>
                    </div>
                    <div className="ml-1 text-sm">
                      <label
                        htmlFor="remember"
                        className="font-medium text-gray-400"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a className={styles.RecoveryPwd} href="/forgot-password/">
                    Recovery Password?
                  </a>
                </div>
                {!isLoading ? (
                  <button
                    className={styles.btn_login}
                    onClick={handleSubmit}
                    disabled={!isDisabled}
                  >
                    Login
                  </button>
                ) : (
                  <LoadingBtn title="Logining..." styles={styles.btn_login} />
                )}
                <button className={styles.btn_back} onClick={handleGoBack}>
                  <MdOutlineArrowBackIosNew />
                  <h4>Go Back</h4>
                </button>
              </>
            ) : (
              <CustomRadio />
            )}
          </form>
          <div className={styles.signup}>
            <p>Don't have an account yet?</p>
            <Link to="/signup">
              <h3>Signup</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
