export const unreadNotificationsFx = (notifications) => {
    return notifications.filter((notification) => notification.isRead === false)
}