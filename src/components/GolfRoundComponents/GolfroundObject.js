import React, { Component } from 'react';
import { Segment, Button, Icon, Grid, Transition, Divider } from "semantic-ui-react";
import PropTypes from 'prop-types';
import moment from "moment";
import setWeatherIcon from "../mapWeatherToSymbol";
import Scorecard from "./Scorecard"

class GolfroundObject extends Component {
    state = {
        visible: false
    }
    toggleScorecardVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible } = this.state;
        const { data, error } = this.props;
        const weatherIcon = setWeatherIcon(data.weather);
        const date = moment(data.date).format("dddd, DD-MMMM-YYYY")
        const time = moment(data.date).format("HH:mm")

        return (

            <Segment secondary raised compact style={{ margin: "0 20px 20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        {date}<br />
                        {data.golfclub}<br />
                        {time}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", textAlign: "center", marginRight: "12px" }}>
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
                            Show scorecard
                                    </Button>
                    }
                </div>

                <Transition.Group animation="slide down" duration={200}>
                    {visible && (
                        <div>
                            <Divider hidden />
                            <Scorecard data={data} error={error} />
                        </div>
                    )
                    }
                </Transition.Group>
            </Segment>

        )
    }
}

GolfroundObject.propTypes = {

};

export default GolfroundObject;