import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import {io} from "socket.io-client";

// Création du contexte ChatContext
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    // Définition des états utilisés dans le contexte
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats,setPotentialChats] = useState([]);
    const [currentChat,setCurrentChat] = useState(null);
    const [messages,setMessages]=useState(null);
    const [isMessagesLoading,setIsMessagesLoading] = useState(false);
    const [messagesError,setMessagesError] =useState(null);
    const[sendTextMessageError,setSendTextMessageError] = useState(null);
    const[newMessage,setNewMessage] = useState(null);
    const [socket,setSocket]=useState(null);
    const [onlineUsers,setOlineUsers]=useState([]);
    const[notifications,setNotifications]=useState([]);

    console.log("noti",notifications);


    // Initiatliser le socket :
    useEffect(()=>{
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);


        return ()=>{
            newSocket.disconnect();
        }
    },[user])


     // Ajouter des utilisateurs en ligne
    useEffect(()=>{
        
        if(socket === null ) return;
        socket.emit("addNewUser",user?._id)
        socket.on("getOnlineUsers", (res)=>{
            setOlineUsers(res);

        });
        return ()=>{
            socket.off("getOnlineUsers");
        };
    },[socket]);

    // Send message

    useEffect(()=>{
        // Vérifie si le socket est défini
        if(socket === null ) return;

        // Récupère l'identifiant du destinataire du chat actuel
        const recipientId = currentChat?.members?.find((id) => id !== user?._id);

        // Émet un événement "sendMessage" vers le serveur WebSocket avec le nouveau message et l'identifiant du destinataire
        socket.emit("sendMessage",{...newMessage, recipientId});

    },[newMessage]);


    // receive Message  and Notification
    useEffect(()=>{
        if(socket === null ) return;

        // Écoute l'événement "getMessage" du serveur WebSocket
        socket.on("getMessage",(res) =>{
        // Vérifie si le chat actuel correspond à celui du message reçu
            if(currentChat?._id !== res.chatId) return ;

            // Met à jour l'état messages en ajoutant le nouveau message reçu
            setMessages((prev)=>[...prev, res])

        });
        // Écoute l'événement "getNotification" du serveur WebSocket
        socket.on("getNotification",(res)=>{
            // Vérifie si le chat de la notification est ouvert dans l'application
            const isChatOpen = currentChat?.members.some(id => id === res.senderId);

              // Met à jour l'état notifications en fonction de la présence ou de l'absence du chat ouvert
            if(isChatOpen){
                setNotifications(prev=>[{...res,isRead:true}, ...prev])
            }else{
                setNotifications(prev=>[res, ...prev])
            }
        })
        


         // Nettoie les écouteurs d'événements lors du démontage du composant ou lorsque le socket change
        return () =>{
            socket.off("getMessage")
            socket.off("getNotification")
        };


    },[socket,currentChat]);



    

    
    

    // Récupérer les utilisateurs
    useEffect(()=>{
        

        const getUsers = async() =>{
            // Récupération de la liste des utilisateurs depuis le serveur
            const response = await getRequest(`${baseUrl}/users`);
             // Vérification des erreurs de réponse
            if(response.error){
                return console.log("Error fetching users",response);
            }
             // Filtrage des utilisateurs avec lesquels l'utilisateur actuel n'a pas encore de chat
           const pChats = response.filter((u)=>{
                let isChatCreated = false ;

                 // Vérification si l'utilisateur est lui-même
                if(user?._id === u._id) return false ;


                // Vérification si un chat existe déjà avec cet utilisateur
                if(userChats){
                    isChatCreated = userChats?.some((chat)=>{
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    })
                }

                console.log("UserChats",userChats);
                // Retourne vrai si aucun chat n'est créé avec cet utilisateur
                return !isChatCreated ;

           })

             // Mise à jour de l'état potentialChats avec les utilisateurs filtrés
            setPotentialChats(pChats)
        
        };

         // Appel de la fonction getUsers pour récupérer les utilisateurs lors du montage du composant ou lorsque userChats change
        getUsers();
    

    },[userChats])

    // Récupérer les chats de l'utilisateur
    useEffect(()=>{
        const getUserChats = async()=>{
             // Vérification de l'existence de l'ID de l'utilisateur
            if(user?._id){

                setIsUserChatsLoading(true)
                setUserChatsError(null); 

                 // Récupération des chats de l'utilisateur depuis le serveur
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
                
                setIsUserChatsLoading(false);

                if(response.error){
                    return setUserChatsError(response)
                }
                setUserChats(response);
            }
        }

        getUserChats()

    },[user])
    
    // Récupérer les messages du chat actuel
    useEffect(()=>{
        const getMessages = async()=>{

                setIsMessagesLoading(true)
                setMessagesError(null); 

                // Récupération des messages du chat actuel depuis le serveur
                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

                setIsMessagesLoading(false);

                if(response.error){
                    return setMessagesError(response)
                }
                // Mise à jour de l'état des messages avec la réponse obtenue
                setMessages(response);
            }

        getMessages()
       

    },[currentChat]);

    // Envoyer un message texte

    const sendTextMessage = useCallback(
     async(textMessage,sender,currentChatId,setTextMessage)=>{
        if(!textMessage) return console.log("You must type something... ");

        // Envoi de la requête POST au serveur pour envoyer le message texte
        const response =await postRequest(`${baseUrl}/messages`,JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage,
        })
    );
    if(response.error){
        return setSendTextMessageError(response)
    }
        // Mise à jour de l'état newMessage avec la réponse obtenue
        setNewMessage(response);

        // Ajout du nouveau message à la liste des messages dans l'état messages
        setMessages((prev) => [...prev, response]);

        // Effacement du champ de saisie de texte après l'envoi du message
        setTextMessage("");

    },
    []
);

    

    const updateCurrentChat = useCallback((chat)=>{
        setCurrentChat(chat);

       

    },[])

    const  createChat = useCallback(async(firstId,secondId)=>{
        // Envoi d'une requête POST pour créer un nouveau chat
        const response = await postRequest(
            `${baseUrl}/chats`,
            JSON.stringify({
            firstId,
            secondId,
        })
    );
    if(response.error){
        return console.log("Erreur creating chat",response);
    }

    // Mise à jour de l'état des chats de l'utilisateur avec le nouveau chat créé
    setUserChats((prev)=>[...prev,response]);


    },[])

    return <ChatContext.Provider 
        value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers,
    }}
    >
        {children}
    </ChatContext.Provider>


}


