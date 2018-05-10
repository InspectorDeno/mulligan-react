import moment from "moment";
import { map, find, filter } from "underscore"

const validate = values => {
    const errors = {}
    if (!values.golfclub) {
        errors.golfclub = 'Required'
    }
    if (!values.golfdate) {
        errors.golfdate = 'Required'
    }
    if (!moment(values.golfdate).isValid()) {
        errors.golfdate = "Wrong date format";
    }
    if (moment(values.golfdate).isAfter(new Date(Date.now()))) {
        errors.golfdate = "Can't be in the future"
    }
    if (!values.golfplayers || !values.golfplayers.length) {
        errors.golfplayers = { _error: "Enter at least one player" }
    } else {
        const playersArrayErrors = [];
        values.golfplayers.forEach(((player, index) => {
            const playerErrors = {};
            if (!player.playerName) {
                playerErrors.playerName = "Required";
                playersArrayErrors[index] = playerErrors;
            }
            if (!player.playerHcp) {
                playerErrors.playerHcp = "Required";
                playersArrayErrors[index] = playerErrors;
            } else if (isNaN(player.playerHcp)) {
                playerErrors.playerHcp = "Wrong format";
                playersArrayErrors[index] = playerErrors;
            }
            if (!player.playerGender) {
                playerErrors.playerGender = "Required";
                playersArrayErrors[index] = playerErrors;
            }
            if (!player.playerTee) {
                playerErrors.playerTee = "Required";
                playersArrayErrors[index] = playerErrors;
            }
            errors.golfplayers = playersArrayErrors;
        }));
    }
    if (values.golfplayers && values.golfplayers.length > 4) {
        errors.golfplayers = { _error: "Limit is 4 players" }
    }
    if (!values.golfscores || !values.golfscores.length) {
        errors.golfscores = { _error: "Invalid" }
    } else {
        const scoresArrayErrors = [];
        values.golfscores.forEach(((hole, index) => {
            let golfHoleErrors = {};
            const f = filter(hole, "score");
            // console.log(hole);
            if (f.length !== values.golfplayers.length) {
                golfHoleErrors = "Required"
                scoresArrayErrors[index] = golfHoleErrors;
                errors.golfscores = { _error: scoresArrayErrors };
            }

        }));
    };

    return errors
}

export default validate