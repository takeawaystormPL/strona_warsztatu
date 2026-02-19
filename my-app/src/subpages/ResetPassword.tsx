import "../css/ResetPassword.css";
import { useState, useRef } from "react";
import { newPassword, ResetPasswordProps, Stages } from "../components/Types";
import Header from "../components/Header";
import sendRecoveryCode from "../functions/sendRecoveryCode";
import checkRecoveryCode from "../functions/checkRecoveryCode";
import setNewPassword from "../functions/setNewPassword";

export default function ResetPassword() {
  const [stage, setStage] = useState<string>(Stages.checkUsername);
  return (
    <div id="resetPasswordContainer">
      <Header />
      <FirstStep stage={stage} setStage={setStage} />
      <SecondStep stage={stage} setStage={setStage} />
      <ThirdStep stage={stage} setStage={setStage} />
    </div>
  );
}
function FirstStep(props: ResetPasswordProps) {
  const [username, setUsername] = useState<string>(Stages.checkUsername);
  const errorRef = useRef<HTMLParagraphElement>(null);
  async function submitForm() {
    const { error, message }: { error: boolean; message: string } =
      await sendRecoveryCode(username);
    if (error) return (errorRef.current!.innerText = message);
    props.setStage(Stages.checkRecoveryCode);
  }
  return (
    <form
      onSubmit={submitForm}
      id="checkUsername"
      className={props.stage === Stages.checkUsername ? "visible" : "invisible"}
    >
      <h1>Zresetuj Hasło</h1>
      <label htmlFor="username">Wpisz nazwę użytkownika:</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
          setUsername(e.currentTarget.value);
        }}
      />
      <p className="error" ref={errorRef}></p>
      <input type="submit" value="Zatwierdź" />
    </form>
  );
}
function SecondStep(props: ResetPasswordProps) {
  const [recoveryCode, setRecoveryCode] = useState<number>(0);
  const errorRef = useRef<HTMLParagraphElement>(null);
  async function submitForm() {
    const { error, message }: { error: boolean; message: string } =
      await checkRecoveryCode(recoveryCode);
    if (error) return (errorRef.current!.innerText = message);
    props.setStage(Stages.setNewPassword);
  }
  return (
    <form
      onSubmit={submitForm}
      id="checkRecoveryCode"
      className={
        props.stage === Stages.checkRecoveryCode ? "visible" : "invisible"
      }
    >
      <h1>Zresetuj Hasło</h1>
      <label htmlFor="">Wpisz kod odzyskiwania:</label>
      <input
        type="number"
        name="recoveryCode"
        id="recoveryCode"
        value={recoveryCode}
        onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
          setRecoveryCode(e.currentTarget.valueAsNumber);
        }}
      />
      <p className="error" ref={errorRef}></p>
      <input type="submit" value="Zatwierdź" />
    </form>
  );
}
function ThirdStep(props: ResetPasswordProps) {
  const [passwords, setPasswords] = useState<newPassword>({
    newPassword: "",
    confirmPassword: "",
  });
  const errorRef = useRef<HTMLParagraphElement>(null);
  async function submitForm() {
    const { error, message }: { error: boolean; message: string } =
      await setNewPassword(passwords.newPassword, passwords.confirmPassword);
    if (error) return (errorRef.current!.innerText = message);
    window.location.href = "/store";
  }
  return (
    <form
      onSubmit={submitForm}
      id="setNewPassword"
      className={
        props.stage === Stages.setNewPassword ? "visible" : "invisible"
      }
    >
      <h1>Zresetuj hasło</h1>
      <div>
        <label htmlFor="newPassword">Wpisz nowe hasło:</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={passwords.newPassword}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
            setPasswords((prev) => ({
              ...prev,
              [e.currentTarget.name]: e.currentTarget.value,
            }));
          }}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Powtórz hasło: </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={passwords.confirmPassword}
          onChange={(e: React.SyntheticEvent<HTMLInputElement>) => {
            setPasswords((prev) => ({
              ...prev,
              [e.currentTarget.name]: e.currentTarget.value,
            }));
          }}
        />
      </div>
      <p className="error" ref={errorRef}></p>
      <input type="submit" value="Zatwierdź" />
    </form>
  );
}
