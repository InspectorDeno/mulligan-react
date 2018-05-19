import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from "redux-form";
import { Dropdown, Message, Label } from 'semantic-ui-react';
import { getGolfClub } from "../../actions/golfclubs";

const golfClubs = [
    "Linköpings Golfklubb",
    "Landeryds Golfklubb",
    "Vreta Kloster Golfklubb",
    "Vårdsbergs Golfklubb"
];

class StepOne extends Component {

    renderSelect = field => (
        <div>
            {/* <pre>{JSON.stringify(field.meta, 0, 2)}</pre> */}

            <Dropdown
                {...field.input}
                selection
                options={field.options}
                placeholder={field.placeholder}
                value={field.input.value}
                loading={field.loading}
                onChange={(param, data) => {
                    this.props.getGolfClub(data.value)
                    field.input.onChange(data.value);
                }}
                style={{ fontSize: "1.4em" }}
            />
        </div>
    );


    render() {
        const { loading, error } = this.props
        return (
            <div>
                <Label ribbon size="huge" color="yellow">Where did you play?</Label>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <Field
                            name="golfclub"
                            component={this.renderSelect}
                            placeholder="Select Golfclub"
                            loading={loading}
                            options={golfClubs.map(val => ({
                                value: val,
                                key: val,
                                text: val
                            }))}
                        />
                        {error && <Label basic color="red" pointing>{error}</Label>}
                    </div>
                </div>
            </div >
        );
    };
}

StepOne.propTypes = {
    getGolfClub: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    golfClubData: state.golfclub.items,
    loading: state.golfclub.loading,
    error: state.golfclub.error
});

export default connect(mapStateToProps, { getGolfClub })(StepOne);
