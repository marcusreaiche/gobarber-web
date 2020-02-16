import React, { useState, useEffect, useMemo } from "react";
import { MdNotifications } from "react-icons/md";
import { parseISO, formatDistanceToNow } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "../../services/api";

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from "./styles";

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get("/notifications");
      const data = response.data.map(notification => ({
        ...notification,
        time: formatDistanceToNow(parseISO(notification.createdAt), {
          addSuffix: true,
          locale: pt,
        }),
      }));
      setNotifications(data);
    }
    loadNotifications();
  }, []);

  const hasUnread = useMemo(
    () => notifications.some(notification => !notification.read),
    [notifications]
  );

  function handleToggleNotificationBtn() {
    setVisible(!visible);
  }

  async function handleReadNotification(id) {
    setNotifications(
      notifications.map(notification => {
        if (notification._id === id) {
          return { ...notification, read: true };
        }

        return notification;
      })
    );
    // Modify the database
    await api.put(`/notifications/${id}`);
  }

  return (
    <Container>
      <Badge hasUnread={hasUnread} onClick={handleToggleNotificationBtn}>
        <MdNotifications size={20} color="#715c91" />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification
              key={String(notification._id)}
              unread={!notification.read}
            >
              <p>{notification.content}</p>
              <time>{notification.time}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleReadNotification(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
