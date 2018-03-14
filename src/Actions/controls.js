/**
 * Actions for the controls reducer. A container will dispatch one of these actions upon the user interacting with the app. The controls reducer will receive one of these actions and adjust the Redux state accordingly.
 */

/**
 * Called when the user presses the play button. Toggles whether the sound is playing or not
 * @constructor
 * @param {string} id - ID of snippet to be played
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const playPressed = id => (dispatch, getState) => {
  let isPlaying = getState().controls.playing;
  let activeID = getState().controls.activeID;

  if (activeID !== id) {
    dispatch(playSound(id));
  } else {
    if (!isPlaying) {
      dispatch(playSound(id));
    } else {
      dispatch(pauseSound(id));
    }
  }
};

export const playSound = id => ({
  type: "PLAY_SOUND",
  id
});

export const pauseSound = id => ({
  type: "PAUSE_SOUND",
  id
});

export const adjustFocus = inFocus => ({
  type: "ADJUST_FOCUS",
  inFocus
});
