import React, { Component } from 'react';
import { Segment, Button, Icon, Transition, Divider } from "semantic-ui-react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from "moment";
import setWeatherIcon from "../mapWeatherToSymbol";
import Scorecard from "./Scorecard";
import RoundStats from "./RoundStats"

class GolfroundObject extends Component {
    state = {
        visible: false
    }
    toggleScorecardVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible } = this.state;
        const { data, error, user } = this.props;
        const weatherIcon = setWeatherIcon(data.weather);
        const date = moment(data.date).format("dddd DD-MMMM, HH:mm")

        return (

            <Segment secondary raised compact style={{ margin: "0 20px 20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex" }}>
                            {data.stats.map(player => (
                                <div>
                                    {player.player === user.username &&
                                        <Segment circular inverted style={{ background: "#fbbd08", width: "45px", height: "45px", padding: 0, fontSize: "20px" }}>
                                            {player.scores.netScore}
                                        </Segment>
                                    }
                                </div>
                            ))}
                            <div style={{ display: "flex", flexDirection: "column", fontSize: "14px" }}>
                                <div style={{ margin: "5px 0 0 10px" }}>
                                    <b>{date}</b>
                                </div>
                                <div style={{ margin: "5px 0 0 10px" }}>
                                    {data.golfclub}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", fontSize: "14px", margin: "12px 0 0 24px" }}>
                            <div>
                                {data.players.map(player => (
                                    <div style={{ display: "list-item", marginRight: "40px" }}>
                                        {player.playerName}
                                        <div style={{ float: "right" }}>{player.playerHcp}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", textAlign: "center", margin: "20px 15px" }}>
                        <div
                            className={error ? "wi wi-refresh" : weatherIcon}
                            style={{
                                color: "#1471a9",
                                fontSize: "90px",
                            }} />
                        {data.weather.summary}
                    </div>
                </div>
                <div style={{ width: "500px" }}>
                    {visible ?
                        <Button
                            type="button"
                            icon
                            inverted
                            labelPosition="right"
                            color="red"
                            onClick={this.toggleScorecardVisibility}
                        ><Icon name="arrow up" />
                            Hide scorecard
                                    </Button>
                        :
                        <Button
                            type="button"
                            icon
                            inverted
                            labelPosition="right"
                            color="green"
                            onClick={this.toggleScorecardVisibility}
                        ><Icon name="arrow down" />
                            Scorecard and Round Stats
                                    </Button>
                    }
                </div>

                <Transition.Group animation="slide down" duration={200}>
                    {visible && (
                        <div>
                            <Divider hidden />
                            <Scorecard data={data} />
                            <RoundStats data={data.stats} />
                        </div>
                    )
                    }
                </Transition.Group>
            </Segment >

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

GolfroundObject.propTypes = {

};

export default connect(mapStateToProps)(GolfroundObject);