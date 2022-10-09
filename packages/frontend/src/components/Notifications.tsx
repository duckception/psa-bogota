import {useNotifications} from "../hooks/useNotifications";
import {useEthers} from "@usedapp/core";

export function Notifications() {
  const { account } = useEthers()
  const notifications = useNotifications('0xDDDDD6d8b1f245dCd915c12D76f9De35DE3C9251')

  return (
    <>
      {
        account && notifications.map(notification => (
          <div onClick={notification.onClick} key={notification.sid}>
            <p>{notification.title}</p>
            <p>{notification.message}</p>
            <a href={notification.cta}>Link</a>
          </div>
        ))
      }
    </>
  )
}
