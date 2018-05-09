import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Dropdown } from 'semantic-ui-react';
import validate from "./validate";

const golfClubs = [
    "Linköpings Golfklubb",
    "Landeryds Golfklubb",
    "Vreta Kloster Golfklubb",
    "Vårdsbergs Golfklubb"
];

const renderSelect = (field) => (
    <div>
        <Dropdown
            {...field.input}
            {...field.custom}
            options={field.options}
            placeholder={field.placeholder}
            value={field.input.value}
            loading={field.loading}
            onChange={(param, data) => {
                // console.log(data);
                // this.RequestData(data);
                field.input.onChange(data.value);
            }}
            selection
        />
    </div>
);

const StepOne = () => {
    return (
        <Field
            name="golfclub"
            component={renderSelect}
            placeholder="Select GolfClub"
            // loading={loading}
            options={golfClubs.map(val => ({
                value: val,
                key: val,
                text: val
            }))} />
    );
};

export default reduxForm({
    form: "createGolfRound",
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
})(StepOne);
