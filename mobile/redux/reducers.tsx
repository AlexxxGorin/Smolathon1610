import { SET_FILTERS, SET_PROFILE, SET_PLACES, SET_PLAYLISTS } from "./actions";

const initialState = {
    filters: {
        'distance': 0,
        'prices': [],
        'tags': [],
        'activity': {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
        },
        'location': {'coordinate': [55.752916397098886, 37.62333981692791], 'radius': 2500},
        'cusine': null
    },
    profile: {
        id: null,
        login: null,
        password: null,
        avatar: null,
    },
    places: [],
    playlists: []
};

function userReducer(state = initialState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case SET_FILTERS:
            return {...state, filters: action.payload}
        case SET_PROFILE:
            return {...state, profile: action.payload}
        case SET_PLACES:
            return {...state, places: action.payload}
        case SET_PLAYLISTS:
            return {...state, playlists: action.payload}
        default:
            return state;
    }
}

export default userReducer;