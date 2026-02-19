import { useState } from "react";
import { RegisterData, RegisterDataRequirements } from "./Types";
import Checked from "../resources/circle-check-solid.svg";
import NotChecked from "../resources/circle-xmark-solid.svg";
import validateRegisterData from "../functions/validateRegisterData";
import validateUsername from "../functions/validateUsername";
import validatePassword from "../functions/validatePassword";
import validateEmail from "../functions/validateEmail";
export default function RegisterForm() {
  const [checksState, setChecksState] = useState<RegisterDataRequirements>({
    startsWithLetter: false,
    hasEnoughCharacters: false,
    hasSpecialCharacters: false,
    hasValidFormat: false,
    hasCapitalLetters: false,
  });
  const [registerData, changeRegisterData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });
  function changeState(
    e: React.SyntheticEvent,
    changeRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>,
  ) {
    const target = e.target as HTMLInputElement;
    changeRegisterData((prev) => {
      const newObject = {
        ...prev,
        [target.id]: target.value,
      };
      checkIfValid(newObject, setChecksState);
      return newObject;
    });
  }
  const [errorParagraph, setErrorParagraph] = useState<string>("");
  return (
    <form
      onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
        submitRegisterForm(e, registerData, setErrorParagraph);
      }}
    >
      <h1>Zarejestruj się</h1>
      <div>
        <label htmlFor="username">Wprowadź nazwę:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={registerData.username}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
            changeState(e, changeRegisterData);
          }}
        />
        <p>
          <img
            src={checksState.startsWithLetter ? Checked : NotChecked}
            alt=""
          />
          Czy ma poprawny format(Zaczyna się od litery)
        </p>
      </div>
      <div>
        <label htmlFor="password">Wprowadź hasło:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={registerData.password}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
            changeState(e, changeRegisterData);
          }}
        />
        <p>
          <img
            src={checksState.hasCapitalLetters ? Checked : NotChecked}
            alt=""
          />
          Hasło zawiera duże litery
        </p>
        <p>
          <img
            src={checksState.hasSpecialCharacters ? Checked : NotChecked}
            alt=""
          />
          Hasło zawiera znaki specjalne
        </p>
        <p>
          <img
            src={checksState.hasEnoughCharacters ? Checked : NotChecked}
            alt=""
          />
          Hasło zawiera conajmniej 12 znaków
        </p>
      </div>
      <div>
        <label htmlFor="email">Wprowadź email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={registerData.email}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
            changeState(e, changeRegisterData);
          }}
        />
        <p>
          <img src={checksState.hasValidFormat ? Checked : NotChecked} alt="" />
          Email posiada poprawny format
        </p>
      </div>
      <div></div>
      <a href="/resetPasswordPage">Zapomniałeś hasła?</a>
      <a href="/loginPage">Masz już konta?Zaloguj się</a>
      <p className="error">{errorParagraph}</p>
      <input type="submit" value="Zarejestruj" />
    </form>
  );
}
async function submitRegisterForm(
  e: React.SyntheticEvent,
  registerData: RegisterData,
  setErrorParagraph: React.Dispatch<React.SetStateAction<string>>,
) {
  e.preventDefault();
  try {
    const { message, isValid } = validateRegisterData(registerData);
    if (!isValid) throw new Error(message);
    const response = await fetch("http://localhost:8000/registerUser", {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Nie udało się wykonać requesta");
    return (window.location.href = "/loginPage");
  } catch (error) {
    return typeof error == "string"
      ? setErrorParagraph(error)
      : error instanceof Error
        ? setErrorParagraph(error.message)
        : "";
  }
}
//Function for validating user data
function checkIfValid(
  data: RegisterData,
  setState: React.Dispatch<React.SetStateAction<RegisterDataRequirements>>,
) {
  validateUsername(data, setState);
  validatePassword(data, setState);
  if ((data as RegisterData).email !== undefined) {
    validateEmail(data);
  }
}
