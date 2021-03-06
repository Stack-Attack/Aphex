import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Menu, Dropdown, Icon, Image, Button} from "semantic-ui-react";

/**
 * Presentational component for the navbar of the application. Displays the correct information to the user based on whether they have authentication.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

class Navbar extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        userInfo: PropTypes.object.isRequired,
        logoutClicked: PropTypes.func.isRequired,
        linkClicked: PropTypes.func.isRequired,
        searchQuery: PropTypes.func.isRequired
    };


    handleSearch() {
        let query = this.refs.search.value.trim();
        this.refs.search.value = "";
        this.props.searchQuery(query);
    }

    render() {

        let imgPath = 'https://syro.dannykivi.com' + this.props.userInfo.user.picture.path;
        let name = this.props.userInfo.user.email;


        const trigger = (
            <span>
        <Image avatar src={imgPath}/> {name}
      </span>
        );

        const logo = require("../Assets/syro_logo_white.svg");

        return (
            <Menu fixed="top" inverted size="small" color="blue">
                <Menu.Item>
                    <Link to="/">
                        <Image src={logo} style={{width: "50px"}} size="small"/>
                    </Link>
                </Menu.Item>

                <Menu.Item className={"SearchContainer"}>
                    <form onSubmit={e => {
                        e.preventDefault();
                        this.handleSearch();
                    }}>
                        <input type={"text"} placeholder="Search..." ref="search"
                        />
                    </form>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Link to="/upload">
                            <Button
                                className={"UploadButton hoverClickBackground"}
                                inverted
                                icon
                                labelPosition="left"
                                size="mini"
                                onClick={() => this.props.linkClicked()}
                            >
                                <Icon name="upload"/>
                                Upload
                            </Button>
                        </Link>
                    </Menu.Item>

                    <Dropdown item trigger={trigger} pointing="top left" icon={null}>
                        <Dropdown.Menu>
                            {/*<Link to="/account">*/}
                                {/*<Dropdown.Item*/}
                                    {/*className="black hoverClick"*/}
                                    {/*text="&nbsp;&nbsp;Account"*/}
                                    {/*icon="user"*/}
                                    {/*onClick={() => this.props.linkClicked()}*/}
                                {/*/>*/}
                            {/*</Link>*/}

                            <Link to="/settings">
                                <Dropdown.Item
                                    className="black hoverClick"
                                    text="&nbsp;&nbsp;Settings"
                                    icon="settings"
                                    onClick={() => this.props.linkClicked()}
                                />
                            </Link>

                            <Dropdown.Item
                                text="Sign Out"
                                icon="sign out"
                                onClick={() => {
                                    this.props.linkClicked();
                                    this.props.logoutClicked();
                                }}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Navbar;
