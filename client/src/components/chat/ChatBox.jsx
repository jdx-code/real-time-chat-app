import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'
import moment from "moment"

const ChatBox = () => {

  const { user } = useContext(AuthContext)
  const { currentChat, messages, isMessagesLoading } = useContext(ChatContext)
  const { recipientUser } = useFetchRecipientUser(currentChat, user)

  if(!recipientUser) 
    return (
      <p style={{textAlign: "center", width: "100%"}}>No chats found..</p>
    )

  if(isMessagesLoading) 
    return (
      <p style={{textAlign: "center", width: "100%"}}>Loading chat..</p>
    )

  return (
    <Stack gap={4} className="chat-box">
      <div className='chat-header'>
          <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack key={index} className={`${message?.senderId === user?._id ? 
            "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}>
                <span>{message.text}</span>
                <span>{moment(message.createdAt).calendar()}</span>                
            </Stack>
          ))
        }
      </Stack>
    </Stack>
  )
    
}

export default ChatBox