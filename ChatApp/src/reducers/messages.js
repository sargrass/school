
const message = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                _id: action._id,
                text: action.text,
                createdAt: action.createdAt,
                user: action.user
            }
        default:
            return state
    }
}



const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            if (state.map(m => m._id).includes(action._id)) {
                return state;
            }else{
                return [
                message(undefined, action),
                ...state
                ]
            }
        case 'SEND_MESSAGE':
            return [
                message(undefined, action),
                ...state
            ]
        default:
            return state
    }
};

export default messages;
