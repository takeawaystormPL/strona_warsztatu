import { RegisterData,LoginData } from "../components/Types";
type ret = {message:string,isValid:boolean}
export default function validateLoginData(data:(RegisterData|LoginData)):ret{
    if((data as RegisterData).email !== undefined){
        const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!emailRegex.test((data as RegisterData).email)) return {message:"Niepoprawny email",isValid:false}
    }
    const usernameRegex = /\b(?![#._,])[a-zA-Z0-9#._]/;
    if(!usernameRegex.test(data.username)) return {message:"Nazwa użytkownika nie spełnia wymaganego formatu",isValid:false}
    const passwordRegexes = [/.*[\W]\.*/,/[A-Z]/,/^\w{1,11}$/];
    const messages = ["Hasło nie zawiera znaku specjalnego","Hasło nie zawiera dużych liter","Hasło ma mniej niz 12 znaków"];
    for(let i = 0; i < 2; i++){
        if(!passwordRegexes[i].test(data.password)){
            return {message:messages[i],isValid:false}
        }
    }
    return {message:"",isValid:true}
}