import React, {Component} from "react";
import Sticky from "react-stickynode";
import "./ItemInfo.css";
import "./Player.css";
import PlayButton from "./Controls/PlayButton";

import {Grid, Image} from "semantic-ui-react";
import faker from "faker";
import wave_yellow from "../../Assets/wave_small.png";

/**
 * Presentational component for Item Info that is displayed when a sound is playing. This component is positioned adjacent to the list of loaded sounds, and will display info on the currently selected sound
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

const host = "https://syro.dannykivi.com";


class ItemInfo extends Component {

    handleComment() {
        let comment = this.refs.comment.value.trim();
        this.refs.comment.value = "";

        let data = {
          comment: comment,
          id: this.props.data._id
        };

        console.log(data);
    }


    render() {
        let title = "";
        let createdAt = "";
        let creator = "";
        let description = "";
        let imgPath = "";

        if (this.props.data) {
            title = this.props.data.name;
            createdAt = this.props.data.createdAt;
            creator = this.props.data.user.email;
            description = this.props.data.description;
            imgPath = host + this.props.data.user.picture.path;
        }

        return (
            <Sticky>
                <Grid
                    celled="interally"
                    className={"PlayerInfo" + (!this.props.data ? " hidden" : "")}
                >
                    <Grid.Column width={4}>
                        <Grid centered>
                            <Grid.Row className="artistRow">
                                <p className="Title">{creator}</p>
                            </Grid.Row>

                            <Grid.Row className="imageRow">
                                <Image className="songImage" src={imgPath}/>
                            </Grid.Row>

                            <Grid.Row className="titleRow">
                                <p className="Title">{title}</p>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>

                    <Grid.Column width={10} className={"noLeftRightPadding noBorder"}>
                        <img
                            src={wave_yellow}
                            class="wavey"
                            alt="FYI, image alt text is required"
                        />
                        <div
                            className={
                                "Waveform" + (this.props.playing ? " playing" : " paused")
                            }
                        />
                    </Grid.Column>
                    <Grid.Column width={2} className={"noBorder"}>
                        <div className={!this.props.displayControls ? "hidden" : ""}>
                            <PlayButton
                                onClick={() => this.props.onToggle(this.props.data)}
                                playing={this.props.playing}
                            />
                        </div>
                    </Grid.Column>
                </Grid>
                <div className={"item-info" + (!this.props.data ? " hidden" : "")}>
                    <p className="infoTitle">
                        {description}
                    </p>
                    <p className="infoTitle">
                        {new Date(createdAt).toString().slice(4, 15)}
                    </p>
                    <form>
                        <input type="text" name="search" placeholder="Write a comment.." ref="comment"/>
                    </form>
                    <button onClick={() => this.handleComment()}>
                        Add comment
                    </button>

                </div>
            </Sticky>
        );
    }
}

export default ItemInfo;
