import React, {Component} from "react";
import "../App/App.css";
import Navbar from "../Components/Navbar.js";
import {Switch, Route} from "react-router-dom";
import Upload from "../Components/Upload/UploadPage.js";
import Signin from "../Components/Login-Signup/Signin.js";
import Settings from "../Components/Settings/SettingsPage.js";
import Account from "../Components/Account/AccountPage.js";
import HomeContainer from "../Containers/HomeContainer";
import {connect} from "react-redux";
import {
    loginUser,
    logoutUser,
    signUpUser,
    uploadUserPicture
} from "../Actions/user";
import {
    uploadSound,
    clearLoadedSounds,
    searchSounds
} from "../Actions/sounds";
import {resetControls} from "../Actions/controls";
import {withRouter} from "react-router-dom";
import History from "../Utils/History";

/**
 * Containers/App.js
 * @author Peter Luft <pwluft@lakeheadu.ca>
 * Main container component which encapulates the entire application. This component is loaded from the index.js. From here, all child components take care of each piece of functionality of the frontend.
 *
 * The component first renders a NavBar child component. View this in ./Components/Navbar.js
 *
 * Next, the component checks to see what route has been provided and renders the corresponding component accordingly. Each rendered component can be examined in the ./Components/* directory.
 */
class App extends Component {
    render() {
        if (this.props.isAuthenticated) {
            //if the user has signed in and authenticated, direct them to full app
            return (
                <div className="App">
                    <div>
                        <Navbar
                            isAuthenticated={this.props.isAuthenticated}
                            userInfo={this.props.userInfo}
                            logoutClicked={() => {
                                this.props.logoutClicked();
                                History.push("/");
                            }}
                            linkClicked={() => this.props.resetControls()}
                            searchQuery={query => this.props.searchQuery(query)}
                        />
                    </div>
                    <main className="App-main-section">
                        <Switch>
                            <Route exact path="/" render={() => <HomeContainer/>}/>
                            <Route
                                exact
                                path="/upload"
                                render={() => (
                                    <Upload
                                        fileUpload={file => this.props.fileUpload(file)}
                                    />)}
                            />
                            <Route
                                exact
                                path="/account"
                                render={() => (
                                    <Account
                                        userInfo={this.props.userInfo}
                                    />)}
                            />
                            <Route
                                exact
                                path="/settings"
                                render={() => (
                                    <Settings
                                        pictureUpload={payload => this.props.pictureUpload(payload)}
                                        userInfo={this.props.userInfo}
                                    />)}
                            />
                        </Switch>
                    </main>
                </div>
            );
        } else {
            //user is not signed in and authenticated; direct them to the signin page
            return (
                <div className="App">
                    <main className="App-main-section">
                        <Signin
                            loginClicked={creds => {
                                this.props.loginClicked(creds);
                                History.push("/");
                            }}
                            signupClicked={creds => this.props.signupClicked(creds)}
                            errorMessage={this.props.errorMessage}
                        />
                    </main>
                </div>
            );
        }
    }
}

/**
 * mapStateToProps takes the global redux state, and maps the necessary pieces of state to the props of this component. That way, the global state can be passed down to each child component.
 * @param {Object} state - Redux state, which will then have elements of it injected into the App component
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    uploadSuccessful: state.sounds.uploadSuccessful,
    errorMessage: state.user.errorMessage,
    userInfo: state.user.userInfo,
    activeID: state.sounds.loadedSounds.find(sound => {
        return sound._id === state.controls.activeID;
    }),
    loadedSounds: state.sounds.loadedSounds,
    playing: state.controls.playing,
});

/**
 * Similarly to mapStateToProps, mapDispatchToProps assigns a series of component methods to actions that Redux will emit onto the state. As a result, state can be directly controlled via this component, so that child components have no knowledge of the state. This keeps things nice and clean.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 * @param {function} dispatch - redux dispatch which connects to the prop methods in HomePage.js
 */
const mapDispatchToProps = (dispatch) => ({
    signupClicked: creds => {
        dispatch(signUpUser(creds));
    },
    loginClicked: creds => {
        dispatch(loginUser(creds));
    },
    logoutClicked: () => {
        dispatch(logoutUser());
        dispatch(clearLoadedSounds());
    },
    fileUpload: file => {
        dispatch(uploadSound(file, localStorage.getItem("id_token")));
    },
    resetControls: () => {
        dispatch(resetControls());
    },
    pictureUpload: payload => {
        dispatch(uploadUserPicture(payload, localStorage.getItem("id_token")));
    },
    searchQuery: query => {
        dispatch(searchSounds(query, localStorage.getItem("id_token")));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
