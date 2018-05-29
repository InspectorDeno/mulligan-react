import React from 'react';
import PropTypes from 'prop-types';
import { Field } from "redux-form";
import { Form, Label } from 'semantic-ui-react';
import Datetime from "react-datetime";
import moment from "moment";
import "./dateTime.css";

// Render DateTime component
const renderDate = ({ input, meta }) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
            {meta.error && <Label basic color="red" pointing="below" >{meta.error}</Label>}
            <Datetime
                name={input.name}
                dateFormat="ddd D/M"
                timeFormat="HH:mm"
                defaultValue={!input.value && new Date(Date.now()).setMinutes(0)}
                value={meta.error ? input.value : moment(input.value).toDate()}
                timeConstraints={{ minutes: { step: 5 } }}
                onChange={param => {
                    input.onChange(param);
                }}
            />
        </div>
    </div>
);

renderDate.propTypes = {
    input: PropTypes.shape({}).isRequired,
    meta: PropTypes.shape({}).isRequired,
}

// First page in Create Golf Round where we select time and date of golf round
const StepTwo = () => (
    <div>
        <Form error>
            <Label ribbon size="huge" color="blue">When was this?</Label>
            <Field name="golfdate" component={renderDate} />
        </Form>
    </div>
)

export default StepTwo;
