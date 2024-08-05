import { createContext,useCallback,useEffect,useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{


// Définition des états pour gérer l'authentification
const [user,setUser]=useState(null);
const [registerError,setRegisterError] = useState(null);
const [isRegisterLoading,setIsRegisterLoading] = useState(false);
const[registerInfo,setRegisterInfo ] = useState({
    nom:"",
    email:"",
    password:""
});
const [loginError,setLoginError] = useState(null);
const [isloginLoading,setIsLoginLoading] = useState(false);

const[loginInfo,setLoginInfo ] = useState({
    email:"",
    password:""
});



// Récupération des données utilisateur depuis le stockage local lors du montage initial
useEffect(()=>{
    const user = localStorage.getItem("User")
    setUser(JSON.parse(user))
},[])

// Fonction pour mettre à jour les informations d'inscription
const updateRegisterInfo = useCallback((info)=>{
    setRegisterInfo(info)
},[])

// Fonction pour mettre à jour les informations de connexion
const updateLoginInfo = useCallback((info)=>{
    setLoginInfo(info)
},[])

// Fonction pour enregistrer un nouvel utilisateur
const registerUser =useCallback(async(e)=>{
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError(null); 

    const response = await postRequest(`${baseUrl}/users/register`,
    JSON.stringify(registerInfo));
    
    setIsRegisterLoading(false);

    if(response.error){
        return setRegisterError(response)
    }

    localStorage.setItem("User",JSON.stringify(response))
    setUser(response)
    
},[registerInfo])

const logOutUser = useCallback(()=>{
    localStorage.removeItem("User");
    setUser(null);
},[]);

// Fonction pour connecter un utilisateur
const loginUser = useCallback(async(e)=>{
    e.preventDefault()

    setIsLoginLoading(true);
    setLoginError(null)

    const response = await postRequest(`${baseUrl}/users/login`,
    JSON.stringify(loginInfo));

    setIsLoginLoading(false); 

    if(response.error){
        return setLoginError(response);
    }

    localStorage.setItem("User",JSON.stringify(response));
    setUser(response);


    
},[loginInfo])

    return( 
    <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logOutUser,
        loginUser,
        updateLoginInfo,
        loginError,
        loginInfo,
        isloginLoading
    }}>
        {children}
    </AuthContext.Provider>
)
};