import groups from '../data/groups';

export const selectGroup = (group_id) => ({
    type: 'SELECT_GROUP',
    group_id
});

export const setGroups = (input_groups) => ({
    type: 'SET_GROUPS',
    input_groups
});

// TODO: async with fetching state later
export const fetchGroups = () => {
    return function (dispatch) {
    	let promise = new Promise((resolve, reject) => {
	      dispatch(setGroups(groups));
	      dispatch(selectGroup(groups[0].id));
	      resolve({
	      	groups: groups
	      });
	    });
	    return promise;
    }
}
