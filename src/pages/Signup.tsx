import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { errorToastStyle, successToastStyle } from "../utils/styles.utils";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { AiOutlineUnlock, AiOutlineLock } from "react-icons/ai";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Link, useNavigate } from "react-router-dom";
import LoadingBtn from "../components/LoadingBtn";
import styles from "../styles/Login.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../store/actions";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = () => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const messageReg = useAppSelector((state) => state.auth.messageReg);
  const successReg = useAppSelector((state) => state.auth.successReg);
  const statusReg = useAppSelector((state) => state.auth.statusReg);
  const [isValidInput, setIsValidInput] = useState({
    matric: false,
    phone: false,
    email: false,
    password: false,
  });
  const [showPwd, setShowPwd] = useState<boolean>(true);
  const labelFNameRef = useRef<HTMLLabelElement>(null);
  const labelLNameRef = useRef<HTMLLabelElement>(null);
  const labelMatricRef = useRef<HTMLLabelElement>(null);
  const labelEmailRef = useRef<HTMLLabelElement>(null);
  const labelPwdRef = useRef<HTMLLabelElement>(null);
  const inputFNameRef = useRef<HTMLInputElement>(null);
  const inputLNameRef = useRef<HTMLInputElement>(null);
  const inputMatricRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPwdRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState({
    fnameInput: "",
    lnameInput: "",
    matricInput: "",
    phoneInput: "",
    emailInput: "",
    passwordInput: "",
  });
  const {
    fnameInput,
    lnameInput,
    matricInput,
    phoneInput,
    emailInput,
    passwordInput,
  } = inputValue;
  const { matric, phone, email, password } = isValidInput;
  const regex = useMemo(() => /^([a-zA-Z]{3}\d{2}[a-zA-Z]{3}\d{3,})$/, []);
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFNameOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelFNameRef.current?.classList.add(styles.label_fname_blur);

    setInputValue((prev) => ({
      fnameInput: value,
      lnameInput: prev.lnameInput,
      matricInput: prev.matricInput,
      phoneInput: prev.phoneInput,
      emailInput: prev.emailInput,
      passwordInput: prev.passwordInput,
    }));
  };

  const handleLNameOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelLNameRef.current?.classList.add(styles.label_lname_blur);

    setInputValue((prev) => ({
      fnameInput: prev.fnameInput,
      lnameInput: value,
      matricInput: prev.matricInput,
      phoneInput: prev.phoneInput,
      emailInput: prev.emailInput,
      passwordInput: prev.passwordInput,
    }));
  };

  const handleMatricOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelMatricRef.current?.classList.add(styles.label_matric_blur);

    setInputValue((prev) => ({
      fnameInput: prev.fnameInput,
      lnameInput: prev.lnameInput,
      matricInput: value,
      phoneInput: prev.phoneInput,
      emailInput: prev.emailInput,
      passwordInput: prev.passwordInput,
    }));

    if (value.length >= 1) {
      setIsValidInput((prev) => ({
        matric: !regex.test(value),
        phone: prev.phone,
        email: prev.email,
        password: prev.password,
      }));
    }
  };

  const handlePhoneOnChange = (value: string, country: any) => {
    setInputValue((prev) => ({
      fnameInput: prev.fnameInput,
      lnameInput: prev.lnameInput,
      matricInput: prev.matricInput,
      phoneInput: value,
      emailInput: prev.emailInput,
      passwordInput: prev.passwordInput,
    }));

    // Validate the phone number
    let isValid = isValidPhoneNumber(value, country.countryCode.toUpperCase());
    if (country.countryCode === "ng") {
      const ngPhoneRegex = /^(\+?234|0)[789][01]\d{8}$/;
      isValid = ngPhoneRegex.test(value);
    }
    setIsValidInput((prev) => ({
      matric: prev.matric,
      phone: !isValid,
      email: prev.email,
      password: prev.password,
    }));
  };

  const handleEmailOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelEmailRef.current?.classList.add(styles.label_email_blur);

    setInputValue((prev) => ({
      fnameInput: prev.fnameInput,
      lnameInput: prev.lnameInput,
      matricInput: prev.matricInput,
      phoneInput: prev.phoneInput,
      emailInput: value,
      passwordInput: prev.passwordInput,
    }));

    if (value.length >= 1) {
      setIsValidInput((prev) => ({
        matric: prev.matric,
        phone: prev.phone,
        email: !emailRegex.test(value),
        password: prev.password,
      }));
    }
  };

  const handlePasswordOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    labelPwdRef.current?.classList.add(styles.label_pwd_blur);

    setInputValue((prev) => ({
      fnameInput: prev.fnameInput,
      lnameInput: prev.lnameInput,
      matricInput: prev.matricInput,
      phoneInput: prev.phoneInput,
      emailInput: prev.emailInput,
      passwordInput: evt.target.value,
    }));

    if (value.length >= 1) {
      setIsValidInput((prev) => ({
        matric: prev.matric,
        phone: prev.phone,
        email: prev.email,
        password: value.length < 6 ? true : false,
      }));
    }
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  useEffect(() => {
    //For Input First Name
    const handleInputFNameBlur = () => {
      if (labelFNameRef.current && inputFNameRef.current) {
        labelFNameRef.current.classList.add(styles.label_fname_blur);
        const value = inputFNameRef.current.value;
        if (value.length === 0) {
          labelFNameRef.current.classList.remove(styles.label_fname_blur);
        }
      }
    };

    //For Input Last Name
    const handleInputLNameBlur = () => {
      if (labelLNameRef.current && inputLNameRef.current) {
        labelLNameRef.current.classList.add(styles.label_lname_blur);

        const value = inputLNameRef.current.value;
        if (value.length === 0) {
          labelLNameRef.current.classList.remove(styles.label_lname_blur);
        }
      }
    };

    //For Input Matric
    const handleInputMatricBlur = () => {
      if (labelMatricRef.current && inputMatricRef.current) {
        const value = inputMatricRef.current.value;
        labelMatricRef.current.classList.add(styles.label_matric_blur);

        if (value.length >= 1) {
          setIsValidInput((prev) => ({
            matric: !regex.test(value),
            phone: prev.phone,
            email: prev.email,
            password: prev.password,
          }));
        }

        if (value.length === 0) {
          labelMatricRef.current.classList.remove(styles.label_matric_blur);
          setIsValidInput((prev) => ({
            matric: false,
            phone: prev.phone,
            email: prev.email,
            password: prev.password,
          }));
        }
      }
    };

    //For Input Email
    const handleInputEmailBlur = () => {
      if (labelEmailRef.current && inputEmailRef.current) {
        labelEmailRef.current.classList.add(styles.label_email_blur);
        const value = inputEmailRef.current.value;

        if (value.length >= 1) {
          setIsValidInput((prev) => ({
            matric: prev.matric,
            phone: prev.phone,
            email: !emailRegex.test(value),
            password: prev.password,
          }));
        }

        if (value.length === 0) {
          labelEmailRef.current.classList.remove(styles.label_email_blur);
          setIsValidInput((prev) => ({
            matric: prev.matric,
            phone: prev.phone,
            email: false,
            password: prev.password,
          }));
        }
      }
    };

    // For Input Password
    const handleInputPwdBlur = () => {
      if (labelPwdRef.current && inputPwdRef.current) {
        labelPwdRef.current.classList.add(styles.label_pwd_blur);
        const value = inputPwdRef.current.value;

        setIsValidInput((prev) => ({
          matric: prev.matric,
          phone: prev.phone,
          email: prev.email,
          password: value.length < 6 ? true : false,
        }));

        if (value.length === 0) {
          labelPwdRef.current.classList.remove(styles.label_pwd_blur);
          setIsValidInput((prev) => ({
            matric: prev.matric,
            phone: prev.phone,
            email: prev.email,
            password: false,
          }));
        }
      }
    };

    const inputFName = document.querySelector("#fname");
    inputFName?.addEventListener("blur", handleInputFNameBlur);

    const inputLName = document.querySelector("#lname");
    inputLName?.addEventListener("blur", handleInputLNameBlur);

    const inputMatric = document.querySelector("#matric_no");
    inputMatric?.addEventListener("blur", handleInputMatricBlur);

    const inputEmail = document.querySelector("#email");
    inputEmail?.addEventListener("blur", handleInputEmailBlur);

    const inputPwd = document.querySelector("#password");
    inputPwd?.addEventListener("blur", handleInputPwdBlur);

    return () => {
      inputFName?.removeEventListener("blur", handleInputFNameBlur);
      inputLName?.removeEventListener("blur", handleInputLNameBlur);
      inputMatric?.removeEventListener("blur", handleInputMatricBlur);
      inputEmail?.removeEventListener("blur", handleInputEmailBlur);
      inputPwd?.removeEventListener("blur", handleInputPwdBlur);
    };
  }, [matric, email, password, regex, emailRegex]);

  const isDisabled =
    fnameInput !== "" &&
    lnameInput !== "" &&
    matricInput !== "" &&
    !matric &&
    phoneInput !== "" &&
    !phone &&
    emailInput !== "" &&
    !email &&
    passwordInput !== "" &&
    !password;

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(
      registerUser({
        firstName: fnameInput,
        lastName: lnameInput,
        matricNo: matricInput,
        phone: phoneInput,
        email: emailInput,
        password: passwordInput,
      })
    );
    // Reset Inputs
    setInputValue({
      fnameInput: "",
      lnameInput: "",
      matricInput: "",
      phoneInput: "",
      emailInput: "",
      passwordInput: "",
    });
  };

  useEffect(() => {
    if (successReg) {
      navigate("/");
    }
  }, [navigate, successReg]);

  useEffect(() => {
    if (statusReg) {
      toast(messageReg, statusReg > 201 ? errorToastStyle : successToastStyle);
    }
  }, [messageReg, statusReg]);

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
            <h2>Welcome to RideSmart</h2>
            <p className={styles.are_you}>
              Are you new? Register a new account
            </p>
            <div className={styles.full_name}>
              {/* FIRST NAME */}
              <div className={styles.input_container}>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  ref={inputFNameRef}
                  value={fnameInput}
                  onChange={handleFNameOnChange}
                  className={styles.input_fname}
                  required
                />
                <label
                  ref={labelFNameRef}
                  htmlFor="fname"
                  className={styles.label_fname}
                >
                  First Name
                </label>
              </div>
              {/* LAST NAME */}
              <div className={styles.input_container}>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  ref={inputLNameRef}
                  value={lnameInput}
                  onChange={handleLNameOnChange}
                  className={styles.input_lname}
                  required
                />
                <label
                  ref={labelLNameRef}
                  htmlFor="lname"
                  className={styles.label_lname}
                >
                  Last Name
                </label>
              </div>
            </div>
            {/* MATRIC */}
            <div
              className={
                matric ? styles.input_container_err : styles.input_container
              }
            >
              <input
                type="text"
                name="matric_no"
                id="matric_no"
                ref={inputMatricRef}
                value={matricInput}
                onChange={handleMatricOnChange}
                className={matric ? styles.input_err : styles.input_matric}
                required
              />
              <label
                ref={labelMatricRef}
                htmlFor="matric_no"
                style={{ color: matric ? "#DC2626" : "" }}
                className={styles.label_matric}
              >
                Matric No
              </label>
            </div>
            {matric && <p className={styles.err_msg}>Invalid Matric No.</p>}
            {/* PHONE NUMBER */}
            <PhoneInput
              country={"ng"}
              value={phoneInput}
              masks={{ ng: "... ... ...." }}
              onChange={handlePhoneOnChange}
              autoFormat
              countryCodeEditable={false}
              inputProps={{
                name: "phone",
                className: `${
                  phone ? styles.input_err_phone : styles.input_phone
                }`,
                required: true,
              }}
            />
            {phone && <p className={styles.err_msg}>Invalid Phone number</p>}
            {/* EMAIL */}
            <div
              className={
                email ? styles.input_container_err : styles.input_container
              }
            >
              <input
                type="email"
                name="email"
                id="email"
                ref={inputEmailRef}
                value={emailInput}
                onChange={handleEmailOnChange}
                className={email ? styles.input_err : styles.input_email}
                required
              />
              <label
                ref={labelEmailRef}
                htmlFor="email"
                className={styles.label_email}
                style={{ color: email ? "#DC2626" : "" }}
              >
                Email
              </label>
            </div>
            {email && <p className={styles.err_msg}>Invalid Email</p>}
            {/* PASSWORD */}
            <div
              className={
                password ? styles.input_container_err : styles.input_container
              }
            >
              <input
                type={showPwd ? "password" : "text"}
                name="password"
                id="password"
                ref={inputPwdRef}
                value={passwordInput}
                onChange={handlePasswordOnChange}
                className={password ? styles.input_err : styles.input_pwd}
                required
              />
              <label
                ref={labelPwdRef}
                htmlFor="password"
                className={styles.label_pwd}
                style={{ color: password ? "#DC2626" : "" }}
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
            {password && (
              <p className={styles.err_msg}>Password must be more than 6</p>
            )}

            <div className={styles.readme}></div>
            {!isLoading ? (
              <button
                className={styles.btn_login}
                disabled={!isDisabled}
                onClick={handleSubmit}
              >
                Signup
              </button>
            ) : (
              <LoadingBtn title="Signing up..." styles={styles.btn_login} />
            )}
          </form>
          <div className={styles.signup}>
            <p>Have an account already?</p>
            <Link to="/">
              <h3>Login</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
