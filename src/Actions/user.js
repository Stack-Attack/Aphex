import * as types from '../Constants/UserActionTypes';

/**
    Actions for the user reducer. A container will dispatch one of these actions upon the user
    interacting with the app. The sounds reducer will receive one of these actions and adjust the
    Redux state accordingly.
 */

const AUTH_ENDPOINT = types.AUTH_ENDPOINT;
const USER_ENDPOINT = types.USER_ENDPOINT;

/**
 * called when user logs in with a pair of credentials. Posts the credential data, and if it's authenticated on the server, returns a JWT
 * POST /authenticate
 * @param {Object} creds - Object containing username and password for signin
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const loginUser = creds => dispatch => {

    let config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": creds.email,
            "password": creds.password
        })
    };
    dispatch(requestLogin());

    return fetch(AUTH_ENDPOINT, config)
        .then(response => response.json().then(user => ({user, response})))
        .then(({user, response}) => {
            console.log(user);
            console.log(response);
            if (!response.ok) {
                //there was a problem
                dispatch(failureLogin(user.message));
                return Promise.reject(user);
            } else {
                localStorage.setItem("id_token", user.accessToken);
                dispatch(receiveLogin(user));
            }
        })
        .catch(err => console.log("Error: ", err));
};

/**
 * called when a user signs up with a set of credentials
 * POST /users
 * @param {Object} creds - Object containing username and password for account creation
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const signUpUser = creds => dispatch => {

    let config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': creds.email,
            'password': creds.password,
            'picture': creds.url
        })
    };

    dispatch(requestCreateUser());
    return fetch(USER_ENDPOINT, config)
        .then(response => response.json().then(user => ({user, response})))
        .then(({user, response}) => {

            if (!response.ok) {
                //there was a problem signing up
                dispatch(failureCreateUser(user.message));
                return Promise.reject(user);
            } else {
                console.log("Successfully signed up");
                dispatch(receiveCreateUser());
                delete creds.url;
                dispatch(loginUser(creds));
            }
        })
        .catch(err => console.log("Error: ", err));
};

/**
 * called when a user clicks the 'logout' button on the navbar
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("id_token");
    dispatch(receiveLogout());
};

/**
 * updates user info with updated data URL of profile picture
 * PATCH /users
 * @param {Object} payload -  Object containing data url of profile picture uploaded by user
 * @param {string} token - JWT retrieved from localstorage
 */
export const uploadUserPicture = (payload, token) => dispatch => {

    dispatch(requestUploadPicture());

    let config = {
        method: 'PATCH',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'picture': payload.url
        })
    };

    return fetch(USER_ENDPOINT, config)
        .then(response => response.json().then(user => ({user, response})))
        .then(({user, response}) => {
            console.log(user);
            if (!response.ok) {
                //error in uploading sound
                dispatch(failureUploadPicture(user.message));
                return Promise.reject(user);
            }
            else {

                dispatch(receiveUploadPicture(user));
            }
        })
        .catch(err => console.log("Error: ", err));
};

//actions for logging user in
export const requestLogin = () => ({
    type: types.REQUEST_LOGIN
});
export const receiveLogin = user => ({
    type: types.RECEIVE_LOGIN,
    id_token: user.id_token,
    user: user
});
export const failureLogin = message => ({
    type: types.FAILURE_LOGIN,
    message
});

//actions for creating user
export const requestCreateUser = () => ({
    type: types.REQUEST_CREATE_USER
});
export const receiveCreateUser = () => ({
    type: types.RECEIVE_CREATE_USER
});
export const failureCreateUser = message => ({
    type: types.FAILURE_CREATE_USER,
    message
});

//actions for logging user out
export const requestLogout = () => ({
    type: types.REQUEST_LOGOUT
});
export const receiveLogout = () => ({
    type: types.RECEIVE_LOGOUT
});

//actions for uploading profile picture
export const requestUploadPicture = () => ({
    type: types.REQUEST_UPLOAD_PICTURE
});
export const receiveUploadPicture = user => ({
    type: types.RECEIVE_UPLOAD_PICTURE,
    user
});
export const failureUploadPicture = message => ({
    type: types.FAILURE_UPLOAD_PICTURE,
    message
})










