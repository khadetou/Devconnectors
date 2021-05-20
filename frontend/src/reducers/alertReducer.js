import { REMOVE_ALERT, SET_ALERT } from '../actions/types';

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action)=>{
    const {preload, type} = action;

    switch (type) {
        case SET_ALERT:
            return [
                ...state,
                preload
            ]
        case REMOVE_ALERT:
            return state.filter(alert=> alert.id !== preload)
        default:
            return state;
    }
}