import { NotificationType } from "../../../constants/notificationType"

const Notification =  ({ notification }) => {
    const color = notification.type === NotificationType.SUCCESS ? 'green' : 'red'
    const notificationStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if (notification.message == null) {
        return null
    }

    return (
        <div className={notification.type} style={notificationStyle}>
            {notification.message}
        </div>
    )
}

export default Notification