import { NotificationType } from '../constants/notificationType'

const Notification =  ({ notification }) => {
    if (!notification || notification.message === null) {
      return null
    }

    const color =  notification.type === NotificationType.SUCCESS ? 'green' : 'red'
    const notificationStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
      <div className={notification.type} style={notificationStyle}>
          {notification.message}
      </div>
    )
}

export default Notification