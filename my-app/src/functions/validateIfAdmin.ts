export default async function validateIfAdmin() {
  const response = await fetch("http://localhost:8000/validateIfAdmin", {
    method: "GET",
    credentials: "include",
  });
  return response.status === 200;
}
