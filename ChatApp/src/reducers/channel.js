
const initialState = {
    group_to_channels: {},
    current_channel_id: '',
}

const channel = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECT_CHANNEL':
            return Object.assign({}, state, {
                current_channel_id: action.channel_id
            });
        case 'SET_GROUP_TO_CHANNELS':
            return Object.assign({}, state, {
                group_to_channels: action.group_to_channels
            });
        default:
            return state
    }
}

export default channel;
