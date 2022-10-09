import * as PushAPI from "@pushprotocol/restapi";
import { useEffect, useState } from "react";

const readSeen = () => JSON.parse(localStorage.getItem('push-seen') ?? '[]')

export function useNotifications(walletAddress: string) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [seen, setSeen] = useState<any[]>(readSeen)

  const fetchNotifications = async () => {
    // const { results } = await api.fetchNotifications(walletAddress)

    const notifications = await PushAPI.user.getFeeds({
      user: `eip155:5:${walletAddress}`, // user address in CAIP
      env: 'staging',
    });

    console.log(notifications)

    // const parsedNotifications = utils.parseApiResponse(results);

    setNotifications(notifications.map((notification: { sid: string; }) => {
      const onClick = () => {
        setSeen(oldSeen => {
          const newSeen = [...oldSeen, notification.sid]
          localStorage.setItem('push-seen', JSON.stringify(newSeen))
          return newSeen
        })
      }
      return {...notification, onClick}
    }))
  }

  useEffect(() => {
    fetchNotifications().catch(console.error)
    const intervalId = setInterval(fetchNotifications, 2000)
    return () => clearInterval(intervalId)
  }, [walletAddress])

  return notifications.filter(notification => !seen.includes(notification.sid))
}
