export default async function checkRecoveryCode(recoveryCode:number){
    try{
        const response = await fetch("http://localhost:8000/checkRecoveryCode",{
        method:"POST",
        body:JSON.stringify({
            recoveryCode:recoveryCode
        }),
        headers:{
            'Content-type':"application/json"
        }
        });
        if(response.status === 200) return{
            error:true,
            message:""
        }
        if (response.status !== 403) throw new Error("Błąd połączenia z serwerem")
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