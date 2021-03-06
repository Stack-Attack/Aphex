import React, { Component } from "react";
import Sticky from "react-stickynode";
import "./ItemInfo.css";
import "./Player.css";
import PlayButton from "./Controls/PlayButton";
import { Grid, Image } from "semantic-ui-react";

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

    this.props.submitComment(data);
  }

  render() {
    let title = "";
    let createdAt = "";
    let creator = "";
    let description = "";
    let imgPath = "";
    let type = "";

    if (this.props.data) {
      title = this.props.data.name;
      createdAt = this.props.data.createdAt;
      creator = this.props.data.user.email;
      description = this.props.data.description;
      imgPath = host + this.props.data.user.picture.path;
      type = this.props.data.type;

      let commentsContent;

      if (this.props.data.comments.length > 0) {
        commentsContent = this.props.data.comments.map(comment => {
          return (
            <Grid className={"removeTopMargin"}>
              <Grid.Column width={2}>
                <Image
                  className="profileImage"
                  src={host + comment.user.picture.path}
                />
              </Grid.Column>

              <Grid.Column width={14} className={"noLeftRightPadding noBorder"}>
                <p className={"userName"}>
                  {" "}
                  {comment.user.email.substring(
                    0,
                    comment.user.email.indexOf("@")
                  )}{" "}
                </p>
                <p className={"comment"}>{comment.comment}</p>
              </Grid.Column>
            </Grid>
          );
        });
      } else {
        commentsContent = "";
      }

      return (
        <Sticky>
          <Grid
            celled="interally"
            className={
              "PlayerInfo " +
              (!this.props.data ? " none" : "") +
              (!this.props.displayControls ? "" : type)
            }
          >
            <Grid.Column width={4} verticalAlign={"middle"}>
              <Grid centered>
                <Grid.Row className="artistRow">
                  <p className="Author">
                    {creator.substring(0, creator.indexOf("@"))}
                  </p>
                </Grid.Row>

                <Grid.Row className="imageRow">
                  <Image className="songImage" src={imgPath} />
                </Grid.Row>

                <Grid.Row className="titleRow">
                  <p className="Title">{title}</p>
                </Grid.Row>
              </Grid>
            </Grid.Column>

            <Grid.Column width={10} className={"noLeftRightPadding noBorder"}>
              <img
                src={require("../../Assets/waveform_" + type + ".svg")}
                className={"wavey"}
                alt={""}
              />
              <div
                className={
                  "Waveform" + (this.props.playing ? " playing" : " paused")
                }
              />
            </Grid.Column>
            <Grid.Column
              width={2}
              className={"noBorder"}
              verticalAlign={"middle"}
            >
              <div className={!this.props.displayControls ? "hidden" : ""}>
                <PlayButton
                  onClick={() => this.props.onToggle(this.props.data)}
                  playing={this.props.playing}
                  type={type}
                />
              </div>
            </Grid.Column>
          </Grid>
          <div className={"item-info" + (!this.props.data ? " hidden" : "")}>
            <p className="infoTitle description noMargin">{description}</p>
            <p className="date">
              {new Date(createdAt).toString().slice(4, 15)}
            </p>
            <form
              className={"commentBox"}
              onSubmit={e => {
                e.preventDefault();
                this.handleComment();
              }}
            >
              <input
                type="text"
                name="search"
                placeholder="Write a comment ..."
                ref="comment"
              />
            </form>
            {commentsContent}
          </div>
        </Sticky>
      );
    } else {
      return <div />;
    }
  }
}

export default ItemInfo;
