import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import PropTypes from "prop-types"

class Pending extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }
    }
    render() {
        const { user } = this.props;
        return (

            <Card>
                <Card.Header>
                    user.name
            </Card.Header>
            </Card>
        );
    }
}


function mapStateToProps(state) {
    return {
        weatherData: state.weather.items,
        loading: state.weather.loading,
        error: state.weather.error
    };
}

Pending.propTypes = {
    name: PropTypes.string.isRequired
};

export default Pending;