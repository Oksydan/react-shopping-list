import React from 'react';
import NotificationElement from './NotificationElement/NotificationElement';
import { Flipper, Flipped } from "react-flip-toolkit";

const notifications = ({ notifications }) => {

    const notifyList = notifications ? notifications.map(el => 
            (<Flipped key={el.id} flipId={el.id}>
                {flippedProps => <li {...flippedProps} className="notification__elem">
                    <NotificationElement
                        id={el.id}
                        text={el.textContent}
                        type={el.notificationType}
                    />
                </li>}
            </Flipped>)
        ) : null;

    console.log(notifications.length);
    
    const notificationsContainer = notifyList ? (
        <Flipper flipKey={notifications.length}>
            <ul className="notification">
                {notifyList}
            </ul>
        </Flipper>
    ) : null;

    return notificationsContainer;
}



export default notifications;