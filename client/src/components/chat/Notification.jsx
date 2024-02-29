import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { unreadNotificationsFx } from '../../utils/unreadNotifications'
import moment from 'moment'

const Notification = () => {

  const [isOpen, setIsOpen] = useState(false)  
  const {user} = useContext(AuthContext)
  const {notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead} = useContext(ChatContext)

  const unreadNotifications = unreadNotificationsFx(notifications)
  const modifiedNotifications = notifications.map((notification) => {
    const sender = allUsers.find(user => user._id === notification.senderId)

    return {
        ...notification,
        senderName: sender?.name
    }
  })

  return (
    <div className='notifications'> 
        <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="bi bi-chat-left-text-fill" 
                viewBox="0 0 16 16"
            >
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
            </svg>
            {unreadNotifications?.length === 0 ? null : (
                <span className='notification-count'>
                    <span>{unreadNotifications?.length}</span>
                </span>
            )}
        </div>
        {isOpen ? (<div className='notifications-box'>
            <div className='notifications-header'>
                <h3>Notifications</h3>
                <div className='mark-as-read' onClick={() => markAllNotificationsAsRead(notifications)}>
                    Mark all as read
                </div>                
            </div>
            {modifiedNotifications?.length === 0 ? (
                <span className='notification'>No notifications</span>
                ) : null}
            {modifiedNotifications && modifiedNotifications.map((notification, index) => {
                return (
                    <div 
                        key={index} 
                        className={notification.isRead ? "notification" : "notification not-read"}
                        onClick={() => {
                            markNotificationAsRead(notification, userChats, user, notifications)
                            setIsOpen(false)
                        }}
                    >
                        <span>{`${notification.senderName} sent you a message`}</span>
                        <span className='notification-time'>{moment(notification.date).calendar()}</span>
                    </div>
                )
            })}
        </div>
        ) : null}        
    </div>
  )
}

export default Notification