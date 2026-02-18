import Header from "../components/Header";
import "../css/login.css";
import { useState } from "react";
import { LoginData } from "../components/Types";
import validateLoginData from "../functions/checkEmail";
export default function LoginPage() {
  return (
    <div>
      <Header />
      <Form />
    </div>
  );
}

function Form() {
  const [loginData, changeLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [errorParagraph, setErrorParagraph] = useState<string>("");
  return (
    <form
      onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
        submitLoginForm(e, loginData, setErrorParagraph);
      }}
    >
      <h1>Zaloguj się</h1>
      <div>
        c<label htmlFor="username">Wprowadź nazwę:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={loginData.username}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
            changeState(e, changeLoginData);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Wprowadź hasło:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={loginData.password}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
            changeState(e, changeLoginData);
          }}
        />
      </div>
      <a href="/resetPasswordPage">Zapomniałeś hasła?</a>
      <a href="/registerPage">Nie masz konta?Zarejestruj się</a>
      <p className="error">{errorParagraph}</p>
      <input type="submit" value="Zaloguj" />
    </form>
  );
}
async function submitLoginForm(
  e: React.SyntheticEvent,
  loginData: LoginData,
  setErrorParagraph: React.Dispatch<React.SetStateAction<string>>,
) {
  e.preventDefault();
  try {
    const { message, isValid } = validateLoginData(loginData);
    if (!isValid) throw new Error(message);
    const response = await fetch("http://localhost:8000/loginUser", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Nie udało się wykonać requesta");
    return (window.location.href = "/store");
  } catch (error) {
    if (typeof error == "string") setErrorParagraph(error);
    else if (error instanceof Error) setErrorParagraph(error.message);
  }
}
function changeState(
  e: React.SyntheticEvent,
  changeLoginData: React.Dispatch<React.SetStateAction<LoginData>>,
) {
  const target = e.target as HTMLInputElement;
  changeLoginData((prev) => ({
    ...prev,
    [target.id]: target.value,
  }));
}
