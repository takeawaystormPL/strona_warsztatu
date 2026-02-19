import { RegisterData, RegisterDataRequirements } from "../components/Types";
export default function validateEmail(data: RegisterData): boolean {
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(data.email);
}
