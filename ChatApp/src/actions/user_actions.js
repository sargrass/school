import firebase from '../firebase';
import { fetchMessages } from './chatroom_actions';
import { fetchChannels } from './channel_actions';
import DeviceInfo from 'react-native-device-info';
// import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult, RemoteNotificationResult } from 'react-native-fcm';
import { Platform } from 'react-native';


export const setUserName = (name) => ({
    type: 'SET_USER_NAME',
    name
});

export const setUserAvatar = (avatar) => ({
    type: 'SET_USER_AVATAR',
    avatar: avatar
});

export const login = () => {
    return function (dispatch, getState) {
        dispatch(startAuthorizing());

        firebase.auth()
                .signInAnonymously()
                .then(() => {
                    const { name, avatar } = getState().user;

                    firebase.database()
                            .ref(`users/${DeviceInfo.getUniqueID()}`)
                            .set({
                                name,
                                avatar
                            });

                    startChatting(dispatch);
                });
    }
}

export const checkUserExists = () => {
    return function (dispatch) {
        dispatch(startAuthorizing());

        firebase.auth()
                .signInAnonymously()
                .then(() => firebase.database()
                                    .ref(`users/${DeviceInfo.getUniqueID()}`)
                                    .once('value', (snapshot) => {
                                        const val = snapshot.val();

                                        if (val === null) {
                                            dispatch(userNoExist());
                                        }else{
                                            dispatch(setUserName(val.name));
                                            dispatch(setUserAvatar(val.avatar));
                                            startChatting(dispatch);
                                        }
                                    }))
                .catch(err => console.log(err))
    }
}

const startChatting = function (dispatch) {
    dispatch(userAuthorized());
    dispatch(fetchChannels());
    dispatch(fetchMessages());

    // FCM.requestPermissions();
    // FCM.getFCMToken()
    //    .then(token => {
    //        console.log(token)
    //    });
    // FCM.subscribeToTopic('secret-chatroom');

    // FCM.on(FCMEvent.Notification, async (notif) => {
    //     console.log(notif);

    //     if (Platform.OS === 'ios') {
    //         switch (notif._notificationType) {
    //             case NotificationType.Remote:
    //                 notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
    //                 break;
    //             case NotificationType.NotificationResponse:
    //                 notif.finish();
    //                 break;
    //             case NotificationType.WillPresent:
    //                 notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
    //                 break;
    //           }
    //         }
    // });

    // FCM.on(FCMEvent.RefreshToken, token => {
    //     console.log(token);
    // });
}

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
