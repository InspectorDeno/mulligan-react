import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findWhere } from "underscore";
import { List, Dropdown, Button, Form, Divider, Message, Segment } from 'semantic-ui-react';
import InlineError from "../messages/InlineError"
import { getFriends } from "../../actions/users";
import { loadFriend, unloadFriend } from "../../actions/friends";

// Class component

const golfTeesOptions = [
    { key: "white", value: "White", text: "White", label: { empty: true, circular: true } },
    { key: "yellow", value: "Yellow", text: "Yellow", label: { color: "yellow", empty: true, circular: true } },
    { key: "blue", value: "Blue", text: "Blue", label: { color: "blue", empty: true, circular: true } },
    { key: "red", value: "Red", text: "Red", label: { color: "red", empty: true, circular: true } }
];
const genderOptions = [
    { key: "male", value: "male", text: "Male" },
    { key: "female", value: "female", text: "Female" },
];

class StepThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            values: []
        };
    }

    componentDidMount() {
        // Only try to fetch data if we don't have it
        if (!this.props.friendData.length) {
            this.props.dispatch(getFriends(this.props.user.username));
        }
    }
    renderInput = ({ input, label, type, meta, index }) => (
        <div>
            {/* {<p>{JSON.stringify(meta, 2, 0)}</p>} */}
            <label htmlFor={input.name}><b>{label}</b></label>
            {meta.touched && meta.error && <InlineError text={meta.error} />}
            <div>
                <Form.Input
                    {...input}
                    type={type}
                    placeholder={label}
                    disabled={index === 0}
                    style={{ width: "100%" }} />
            </div>
        </div>
    );


    renderSelect = field => (
        <div>
            <label htmlFor={field.input.name}><b>{field.label}</b></label>
            {field.meta.touched && field.meta.error && <InlineError text={field.meta.error} />}
            <div>
                <Dropdown
                    {...field.input}
                    fluid
                    floating
                    selection
                    placeholder={field.label}
                    options={field.options}
                    loading={field.loading}
                    disabled={field.index === 0}
                    onChange={(e, { value }) => {
                        e.preventDefault();
                        field.input.onChange(value);
                    }}
                />
            </div>
        </div>
    );

    // renderFriendsSelect = ({ input, meta, label, options, loading }) => {
    //     const { values } = this.state;
    //     const { friendData, submittedPlayers } = this.props;
    //     return (
    //         <div>
    //             <pre>.....................this.state..................</pre>
    //             <pre>{JSON.stringify(this.state, null, 2)}</pre>
    //             {/* <pre>.....................this.state.players..................</pre> */}
    //             {/* <pre>{JSON.stringify(players, null, 2)}</pre> */}
    //             <pre>.....................this.props.friendData..................</pre>
    //             <pre>{JSON.stringify(friendData, null, 2)}</pre>
    //             <pre>.....................this.props.submittedPlayers..................</pre>
    //             <pre>{JSON.stringify(submittedPlayers, null, 2)}</pre>
    //             <label htmlFor={input.name}><b>{label}</b></label>
    //             {meta.touched && meta.error && <InlineError text={meta.error} />}
    //             <div>
    //                 <Dropdown
    //                     {...input}
    //                     floating
    //                     selection
    //                     multiple
    //                     value={values}
    //                     placeholder={label}
    //                     options={options}
    //                     loading={loading}
    //                     onChange={(e, data) => {
    //                         input.onChange((data));
    //                     }}
    //                     onLabelClick={() => console.log("yep")}
    //                 />
    //                 {/* <pre>{JSON.stringify(value,0,2)}</pre> */}
    //             </div>
    //         </div>
    //     )
    // };

    // Kallas från multiselectorn när vi lägger till eller tar bort (lilla xet)
    handleChange = (data, fields) => {
        this.setState({ values: data.value })
        const friendPlayers = [];
        data.value.forEach(user => {
            const theFriend = findWhere(this.props.friendData, { username: user });
            const player = {
                playerName: theFriend.username,
                playerHcp: theFriend.hcp,
                playerGender: theFriend.gender,
                playerTee: "Red"
            }
            friendPlayers.push(player);

            if (friendPlayers.length > this.state.players.length) {
                console.log("Lagt till vän");
                fields.push(player);
            } else {
                console.log("Ta bort");
                // Hitta
            }
        });
        this.setState({ players: friendPlayers });
    }

    renderPlayers = ({ fields, meta, friends, values }) => {
        const { submittedPlayers } = this.props;
        return (
            <List style={{ maxWidth: "100%" }}>
                <List.Item>
                    <pre>...............this.state............</pre>
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    <Dropdown
                        floating
                        selection
                        multiple
                        value={values}
                        placeholder="Choose friend"
                        options={friends.map(friend => ({
                            value: friend.username,
                            key: friend.username,
                            text: friend.username
                        }))}
                        onChange={(e, data) => {
                            e.preventDefault();
                            this.handleChange(data, fields);
                        }}
                    />
                </List.Item>
                <List.Item>
                    <div style={{ display: "flex" }}>
                        <Button type="button" onClick={() => {
                            fields.push({});
                        }
                        }>{fields.length > 1 ? "Add another player" : "Add Player"}</Button>
                        {meta.error && <Message size="small" negative style={{ marginTop: 0, padding: "8px" }} header={meta.error} />}
                        {/* {meta.error && <InlineError text={meta.error} style={{ float: "right" }} />} */}
                    </div>
                </List.Item>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {fields.map((player, index) => (
                        <Segment compact style={{ margin: "10px" }}>
                            <List.Item key={index} style={{ width: "180px" }}>
                                <p>{index}</p>
                                <div style={{ display: "inline-block", width: "100%" }}>
                                    <div style={{ fontSize: "20px", fontWeight: "bold", float: "left" }}>Player {index + 1}</div>
                                    <Button
                                        size="mini"
                                        negative
                                        type="button"
                                        icon="remove"
                                        floated="right"
                                        disabled={index === 0}
                                        onClick={() => {
                                            fields.remove(index);
                                            // this.props.dispatch(unloadFriend(submittedPlayers))
                                        }}
                                        style={{ margin: 0 }}
                                    />
                                </div>
                                <Divider style={{ margin: 0 }} />
                                <Field
                                    name={`${player}.playerName`}
                                    type="text"
                                    component={this.renderInput}
                                    label="Name"
                                    index={index}
                                />
                                <Field
                                    name={`${player}.playerHcp`}
                                    type="text"
                                    component={this.renderInput}
                                    label="HCP"
                                    index={index}
                                />
                                <Field
                                    name={`${player}.playerGender`}
                                    component={this.renderSelect}
                                    options={genderOptions}
                                    label="Gender"
                                    index={index}
                                />
                                <Field
                                    name={`${player}.playerTee`}
                                    component={this.renderSelect}
                                    options={golfTeesOptions}
                                    label="Tee"
                                />
                            </List.Item>
                        </Segment>
                    ))}
                </div>
            </List>
        );
    }

    render() {
        const { friendData } = this.props;
        const { values } = this.state;
        return (
            <div>
                <FieldArray name="golfplayers" component={this.renderPlayers} friends={friendData} values={values} />
            </div>
        );
    }
};

StepThree.propTypes = {
    dispatch: PropTypes.func.isRequired,
    friendData: PropTypes.arrayOf(PropTypes.object),
    loadFriend: PropTypes.func.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired
    }).isRequired
}

StepThree.defaultProps = {
    friendData: []
}

const selector = formValueSelector('createGolfRound')
function mapStateToProps(state) {
    return {
        user: state.user,
        friendData: state.user.friends,
        pendingData: state.user.pending,
        submittedPlayers: selector(state, "golfplayers")
    };
}

StepThree = connect(mapStateToProps, { loadFriend, unloadFriend })(StepThree);
// StepThree = connect(state => ({
//     values: {
//         golfplayers: state.friends.data
//     }
// }), { loadFriend })(StepThree)

export default reduxForm({
    form: "createGolfRound",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(StepThree);
