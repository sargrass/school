
import firebase from '../firebase';


export const addMessage = (msg_attrs) => ({
    type: 'ADD_MESSAGE',
    ...msg_attrs
});

export const sendMessage = (msg_input, user) => {
    return function (dispatch) {
        const newMsgRef = firebase.database()
                                  .ref('messages')
                                  .push();
        msg_for_db = Object.assign({}, msg_input, {
            _id: newMsgRef.key,
            createdAt: msg_input.createdAt.getTime()
        });
        newMsgRef.set(msg_for_db);

        msg_for_redux = Object.assign({}, msg_for_db, {
            user: {
                _id: msg_input.user._id,
                name: user.name,
                avatar: user.avatar
            }
        });
        dispatch(addMessage(msg_for_redux));
    };
};

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});

export const fetchMessages = () => {
    return function (dispatch) {
        dispatch(startFetchingMessages());

        const database = firebase.database();
        const messages = database.ref('messages');
        const users = database.ref('users');

        function receiveMessages(messages) {
            return function (dispatch) {
                users.on('value', function(snapshot) {
                    Object.entries(messages).forEach(([msg_id, msg]) => {
                        const userObj = Object.assign({}, snapshot.val()[msg.user._id]);
                        msg_obj = Object.assign({}, msg, {
                            user: {
                                _id: msg.user._id,
                                name: userObj["name"],
                                avatar: userObj["avatar"]
                            }
                        });
                        dispatch(addMessage(msg_obj));
                    });

                    dispatch(receivedMessages());
                });
            }
        }

        messages.orderByKey()
                .limitToLast(20)
                .on('value', (snapshot) => {
                    console.log('firebase value change');
                    // gets around Redux panicking about actions in reducers
                    setTimeout(() => {
                        const messages = snapshot.val() || [];

                        dispatch(receiveMessages(messages))
                    }, 0);
                });
    }
}

// export const receiveMessages = (messages) => {
//     return function (dispatch) {
//         Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

//         dispatch(receivedMessages());
//     }
// }

