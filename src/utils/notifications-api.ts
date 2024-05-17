import { routingHelper } from './navigateHelper';

export const initializeNotificationsApi = () => {
    let { permission } = Notification;
    if (['default', 'denied'].includes(permission)) {
        Notification.requestPermission().then((response) => {
            console.log(response);
        });
    }
};

/**
 * @param title Notification title
 * @param options Notification body, icon, etc. check NotificationOptions type for more info.
 * @important Use `data` option to pass the link `absolute path without the origin` to open when the notification is clicked.
 */
export const showSystemNotification = (
    title: string,
    options: NotificationOptions,
) => {
    let { permission } = Notification;
    let notificationObject: Notification = null!;
    
    if (document.hasFocus()) return; // Do not show notification if the tab is focused.

    if (permission === 'default') {
        Notification.requestPermission().then((response) => {
            if (response === 'granted') {
                notificationObject = new Notification(title, {
                    ...options,
                    dir: 'auto',
                });
            }
        });
    }
    if (permission === 'granted') {
        notificationObject = new Notification(title, options);
    }

    if (notificationObject) {
        notificationObject.onclick = (_event) => {
            try {
                let origin = new URL(window.location.href).origin;
                new URL(`${origin}/${options?.data}` ?? 'invalid'); // Check if it is a valid URL.
                window.focus();
                routingHelper.navigate(options.data);
            } catch (error) {
                console.error('Invalid URL');
            }
        };
    }
};
