import { RegisterData, RegisterDataRequirements } from "../components/Types";
export default function validatePassword(
  data: RegisterData,
  setState: React.Dispatch<React.SetStateAction<RegisterDataRequirements>>,
) {
  const passwordRegexes = [/[A-Z]/, /[\W]/, /[^\s]{12,}/];
  setState((prev) => ({
    ...prev,
    hasSpecialCharacters: passwordRegexes[1].test(data.password),
    hasCapitalLetters: passwordRegexes[0].test(data.password),
    hasEnoughCharacters: passwordRegexes[2].test(data.password),
  }));
}
