export const SET_FILTERS = 'SET_FILTERS';
export const SET_PROFILE = 'SET_PROFILE'
export const SET_PLACES = 'SET_PLACES'
export const SET_PLAYLISTS = 'SET_PLAYLISTS'

export const setFilters = (filters: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
        type: SET_FILTERS,
        payload: filters,
    });
};
export const setProfile = (profile: { id: any; login: any; password: any; tag: any; avatar: any; liked: any; likedplaylists: any; likedroutes: any; date: any; city: any; algorithms: any; }) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
        type: SET_PROFILE,
        payload: profile,
    });
};
export const setPlaces = (places: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
        type: SET_PLACES,
        payload: places,
    });
};

export const setPlaylists = (playlists: any) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
        type: SET_PLAYLISTS,
        payload: playlists,
    })
}