export default async function validateIfAdmin(){
    const response = await fetch("http://localhost:8000/validateIfAdmin",{
        method:"GET",
        credentials:"include"
    });
    if(response.status !== 200) {
        console.log(response.status);
        const json = await response.json();
        console.log(json);
        return false;
    }
    return true;
}