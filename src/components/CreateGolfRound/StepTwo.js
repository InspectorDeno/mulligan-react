import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from "redux-form";
import { Message, Form } from 'semantic-ui-react';
import Datetime from "react-datetime";
import moment from "moment";
import "./dateTime.css";

const renderDate = ({ input, meta }) => (
    <div>
        <label htmlFor={input.name} style={{ float: "left" }}>
            Pick a date
        </label>
        <Datetime
            name={input.name}
            dateFormat="ddd D/M"
            timeFormat="HH:mm"
            defaultValue={!input.value && new Date(Date.now()).setMinutes(0)}
            value={moment(input.value).toDate()}
            timeConstraints={{ minutes: { step: 5 } }}
            onChange={param => {
                input.onChange(param);
            }}
        />
        {meta.error && <Message error>{meta.error}</Message>}
        {/* <span>{JSON.stringify(meta, 0, 2)}</span> */}
    </div>
);

renderDate.propTypes = {
    input: PropTypes.shape({}).isRequired,
    meta: PropTypes.shape({}).isRequired,
}

const StepTwo = () => (
    <Form error>
        <Field name="golfdate" component={renderDate} />
    </Form>
)

export default reduxForm({
    form: "createGolfRound",
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(StepTwo);
