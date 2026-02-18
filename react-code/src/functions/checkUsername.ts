export default async function checkUsername(username:string){
    try{
         const response = await fetch("http://localhost:8000/checkUsername",{
        method:"POST",
        body:JSON.stringify({
            username:username
        }),
        headers:{
            'Content-type':"application/json"
        }
    });
    if(response.status === 200){
        return {
            error:false,
            message:""
        }
    }
    if(response.status !== 401){
        throw new Error("Błąd połączenia z serwerem")
    }
    const json = await response.json() ;
    throw new Error(json["Error"]);
    }catch(e){
        return {
            error:true,
            message:typeof e == "string"?e:e instanceof Error?e.message:""
        }
    }
   
}