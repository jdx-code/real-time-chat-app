import { useCallback } from "react";
import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {

    const [userChats, setUserChats] = useState(null)
    const [isUserChatsLoading, setisUserChatsLoading] = useState(false)
    const [userChatsError, setuserChatsError] = useState(null)
    const [potentialChats, setPotentialChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [isMessagesLoading, setIsMessagesLoading] = useState(false)
    const [messagesError, setMessagesError] = useState(null)

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`)
            if(response.error) {
                return console.log("Error fetching users", responske)
            }

            const pChats = response.filter((u) => {
                
                let isChatCreated = false

                if(user._id === u._id) return false

                if(userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id 
                    })
                }

                return !isChatCreated
            })

            setPotentialChats(pChats)
        }

        getUsers()
    }, [userChats])

    useEffect(() => {
        const getUserChats = async() => {
            if(user?._id) {

                setisUserChatsLoading(true)
                setuserChatsError(null)

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)

                setisUserChatsLoading(false)

                if(response.error){
                    return setuserChatsError(response)
                }

                setUserChats(response)
            }
        }

        getUserChats()
    }, [user])

    useEffect(() => {
        const getMessages = async() => {            

            setIsMessagesLoading(true)
            setMessagesError(null)

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)

            setIsMessagesLoading(false)

            if(response.error){
                return setMessagesError(response)
            }

            setMessages(response)
            
        }

        getMessages()
    }, [currentChat])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
            firstId, 
            secondId,
        }))

        if(response.error) {
            return console.log("Error creating chat", response)
        }

        setUserChats((prev) => [...prev, response])
    }, [])

    return (
        <ChatContext.Provider 
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
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

