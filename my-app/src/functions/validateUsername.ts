import { RegisterData, RegisterDataRequirements } from "../components/Types";
export default function validateUsername(
  data: RegisterData,
  setState: React.Dispatch<React.SetStateAction<RegisterDataRequirements>>,
) {
  const usernameRegex = /\b(?![#._,])[a-zA-Z0-9#._]/;
  setState((prev) => ({
    ...prev,
    startsWithLetter: usernameRegex.test(data.username),
  }));
}
