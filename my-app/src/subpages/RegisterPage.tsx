import { useRef, useState } from "react";
import Checked from "../resources/circle-check-solid.svg";
import NotChecked from "../resources/circle-xmark-solid.svg";
import Header from "../components/Header";
import "../css/login.css";
import { RegisterData } from "../components/Types";
import validateLoginData from "../functions/checkEmail";
export default function RegisterPage() {
  return (
    <div>
      <Header />
      <Form />
    </div>
  );
}

function Form() {
  const startsWithLetter = useRef<HTMLImageElement>(null),
    hasEnoughCharacters = useRef<HTMLImageElement>(null),
    hasSpecialCharacters = useRef<HTMLImageElement>(null),
    hasValidFormat = useRef<HTMLImageElement>(null),
    hasCapitalLetters = useRef<HTMLImageElement>(null);
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
      checkIfValid(newObject, [
        hasValidFormat,
        startsWithLetter,
        hasCapitalLetters,
        hasSpecialCharacters,
        hasEnoughCharacters,
      ]);
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
          <img src={NotChecked} alt="" ref={startsWithLetter} />
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
          <img src={NotChecked} alt="" ref={hasCapitalLetters} />
          Hasło zawiera duże litery
        </p>
        <p>
          <img src={NotChecked} alt="" ref={hasSpecialCharacters} />
          Hasło zawiera znaki specjalne
        </p>
        <p>
          <img src={NotChecked} alt="" ref={hasEnoughCharacters} />
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
          <img src={NotChecked} alt="" ref={hasValidFormat} />
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
    const { message, isValid } = validateLoginData(registerData);
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
    if (typeof error == "string") setErrorParagraph(error);
    else if (error instanceof Error) setErrorParagraph(error.message);
  }
}
function checkIfValid(
  data: RegisterData,
  refs: React.RefObject<HTMLImageElement | null>[],
) {
  const usernameRegex = /\b(?![#._,])[a-zA-Z0-9#._]/;
  if (!usernameRegex.test(data.username))
    return (refs[1].current!.src = NotChecked);
  refs[1].current!.src = Checked;
  const passwordRegexes = [/[A-Z]/, /[\W]/, /[^\s]{12,}/];
  for (let i = 0; i < 3; i++) {
    if (!passwordRegexes[i].test(data.password))
      refs[i + 2].current!.src = NotChecked;
    else refs[i + 2].current!.src = Checked;
  }
  if ((data as RegisterData).email !== undefined) {
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test((data as RegisterData).email))
      refs[0].current!.src = NotChecked;
    else refs[0].current!.src = Checked;
  }
}
