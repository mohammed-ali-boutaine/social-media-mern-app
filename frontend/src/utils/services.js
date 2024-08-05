export const baseUrl = "http://localhost:5000/api";

export const postRequest = async(url,body) => {
    console.log("body",body);
    

    // Envoi de la requête POST à l'URL spécifiée avec les données JSON passées dans le corps de la requête
   const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body
    })

    // Conversion de la réponse en JSON
    const data = await response.json() ;
    if(!response.ok){
        let message
        if(data?.message){
            message = data.message
        }else{
            message = data
        }
        return {error:true, message}
    }
    return data ;
};

export const getRequest = async(url) => {
   const response = await fetch(url);

   const data = await response.json();

   if(!response.ok){
    let message = "An error occured.."

        if(data?.message){
            message=data.message

        }
        return{error:true,message}
   }
   return data;
};

  
