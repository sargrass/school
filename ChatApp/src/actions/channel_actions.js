import channels from '../data/channels';

export const selectChannel = (channel_id) => ({
    type: 'SELECT_CHANNEL',
    channel_id
});

export const setGroupToChannels = (group_to_channels) => ({
    type: 'SET_GROUP_TO_CHANNELS',
    group_to_channels
});

// TODO: async with fetching state later
export const fetchChannels = () => {
    return function (dispatch) {
    	let promise = new Promise((resolve, reject) => {
	      dispatch(setGroupToChannels(channels));
	      resolve({
	      	group_to_channels: channels
	      });
	    });
	    return promise;
    }
}
