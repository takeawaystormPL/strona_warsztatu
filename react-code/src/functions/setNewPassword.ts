export default async function setNewPassword(password1:string,password2:string){
    try{
        if(password1 !== password2) throw new Error("Hasła nie są takie same");
        const response = await fetch("http://localhost:8000/setNewPassword",{
        method:"POST",
        body:JSON.stringify({
            newPassword:password1
        })
    });
    if(response.status === 200){
        return {
            error:false,
            message:""
        }
    }
    if(response.status !== 400) throw new Error("Błąd połączenia z serwerem");
    const json = await response.json();
    throw new Error(json["Error"]);
    }
    catch(e){
         return {
            error:true,
            message:typeof e == "string"?e:e instanceof Error?e.message:""
        }
    }
  
}