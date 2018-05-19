import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Table, Icon } from "semantic-ui-react";
import _ from "lodash";
import moment from "moment";
import { find, findWhere, pick, reduce } from "underscore";
import { setWeatherIcon } from "../mapWeatherToSymbol";

const RenderNineHoles = ({ start }) => {
    let numbers = _.times(9, i => (
        <Table.HeaderCell key={i}>{start + i}</Table.HeaderCell>
    ))
    if (start === 1) {
        numbers = numbers.concat(<Table.HeaderCell style={{ background: "darkgrey" }} width={1}>Out</Table.HeaderCell>);
    } else {
        numbers = numbers.concat(<Table.HeaderCell style={{ background: "darkgrey" }} width={1}>In</Table.HeaderCell>);
    }
    return numbers;
}
const RenderNineIndexes = ({ start, holes }) => {
    const indexes = _.times(9, i => (
        <Table.Cell key={i}>{find(holes, { number: start + i }).index}</Table.Cell>
    ))
    return indexes;
}

const RenderNinePars = ({ start, holes }) => {
    let sum = 0;
    const pars = _.times(9, i => {
        const par = find(holes, { number: start + i }).par
        sum += par;
        return (
            <Table.Cell key={i}>{par}</Table.Cell>
        )
    })
    return pars.concat(<Table.Cell style={{ background: "darkgrey", color: "white", fontSize: "15px" }}>{sum}</Table.Cell>)
}

const RenderParSum = ({ holes }) => {
    let sum = 0;
    _.times(holes.length, i => {
        const par = find(holes, { number: i + 1 }).par
        sum += par;
    })
    return (<Table.Cell style={{ background: "grey", color: "white", fontSize: "15px" }}>{sum}</Table.Cell>)
}

const RenderNineScores = ({ start, player, data }) => {
    let sum = 0;
    const scores = _.times(9, i => {
        const score = Number(reduce(pick(findWhere(data.scores, { hole: start + i }), `${player.playerName}`), "score").score);
        const par = find(data.golfholes, { number: start + i }).par
        sum += score;
        let color = "none"
        if (score - par < 0) {
            color = "gold"
        } else if (score - par === 1) {
            color = "lightgray"
        } else if (score - par >= 2) {
            color = "gray"
        }
        return (
            <Table.Cell key={i} style={{ background: color, borderTop: "2px solid white", borderBottom: "2px solid white" }}>{score}</Table.Cell>
        )
    })
    return scores.concat(<Table.Cell style={{ background: "darkgrey", color: "white", fontSize: "15px" }}>{sum}</Table.Cell>);
}

const RenderScoreSum = ({ player, data }) => {
    let sum = 0;
    _.times(data.scores.length, i => {
        const score = Number(reduce(pick(findWhere(data.scores, { hole: i + 1 }), `${player.playerName}`), "score").score);
        sum += score;
    });
    return <Table.Cell style={{ background: "grey", color: "white", fontSize: "15px" }}>{sum}</Table.Cell>
}

const RenderPlusMinus = ({ start, player, data }) => {
    let sumScore = 0;
    let sumPar = 0;
    let diff = 0;

    let plusminus = _.times(9, i => {
        const score = Number(reduce(pick(findWhere(data.scores, { hole: start + i }), `${player.playerName}`), "score").score);
        const par = find(data.golfholes, { number: start + i }).par
        sumScore += score;
        sumPar += par;
        diff = sumScore - sumPar;
        return (<Table.Cell key={i}>{diff > 0 && "+"}{diff}</Table.Cell>)
    })
    plusminus = plusminus.concat(
        <Table.Cell style={{ background: "darkgrey", color: "white", fontSize: "15px" }}>{diff > 0 && "+"}{diff}</Table.Cell>
    )
    if (data.golfholes.length === 18) {
        plusminus = plusminus.concat(_.times(9, i => {
            const score = Number(reduce(pick(findWhere(data.scores, { hole: 10 + i }), `${player.playerName}`), "score").score);
            const par = find(data.golfholes, { number: 10 + i }).par
            sumScore += score;
            sumPar += par;
            diff = sumScore - sumPar;
            return (<Table.Cell key={i}>{diff > 0 && "+"}{diff}</Table.Cell>)
        }))
    }
    plusminus = plusminus.concat(
        <Table.Cell style={{ background: "darkgrey", color: "white", fontSize: "15px" }}>{diff > 0 && "+"}{diff}</Table.Cell>
    )
    return plusminus.concat(<Table.Cell style={{ background: "grey", color: "white", fontSize: "15px" }}>{diff > 0 && "+"}{diff}</Table.Cell>)
}

const Scorecard = ({ data, error }) => (
    <Table celled size="small" compact collapsing stackable textAlign="center">
        <Table.Body>
            {/* Hole numbers */}
            <Table.Row style={{ background: "grey", color: "white" }}>
                <Table.HeaderCell>Hole</Table.HeaderCell>
                {/* TODO: Check for inner / outer */}
                <RenderNineHoles start={1} />
                <RenderNineHoles start={10} />
                <Table.HeaderCell style={{ background: "grey" }} width={1}>Sum</Table.HeaderCell>
            </Table.Row>

            {/* Indexes */}
            <Table.Row disabled>
                <Table.HeaderCell>Index</Table.HeaderCell>
                <RenderNineIndexes start={1} holes={data.golfholes} />
                <Table.Cell style={{ background: "darkgrey", color: "white", fontSize: "15px" }}>{" "}</Table.Cell>
                <RenderNineIndexes start={10} holes={data.golfholes} />
                <Table.Cell style={{ background: "darkgrey", color: "white", fontSize: "15px" }}>{" "}</Table.Cell>
                <Table.Cell style={{ background: "grey", color: "white", fontSize: "15px" }}>{" "}</Table.Cell>
            </Table.Row>

            {/* Pars */}
            <Table.Row>
                <Table.HeaderCell>Par</Table.HeaderCell>
                <RenderNinePars start={1} holes={data.golfholes} />
                <RenderNinePars start={10} holes={data.golfholes} />
                <RenderParSum holes={data.golfholes} />
            </Table.Row>
        </Table.Body>

        {/* Player  */}
        {data.players.map(player => (
            <Table.Body>
                <Table.Row>
                    <Table.HeaderCell colSpan={data.golfholes.length === 18 ? 22 : 12} style={{ background: "lightblue", textAlign: "left" }}>
                        <Icon name="user" />
                        {player.playerName}
                    </Table.HeaderCell>
                </Table.Row>
                {/* Player score */}
                <Table.Row>
                    <Table.HeaderCell>Score</Table.HeaderCell>
                    <RenderNineScores start={1} player={player} data={data} />
                    <RenderNineScores start={10} player={player} data={data} />
                    <RenderScoreSum player={player} data={data} />
                </Table.Row>
                {/* Player Points */}
                <Table.Row>
                    <Table.HeaderCell>Points</Table.HeaderCell>
                    <RenderNinePars start={1} holes={data.golfholes} />
                    <RenderNinePars start={10} holes={data.golfholes} />
                    <Table.Cell style={{ background: "grey", color: "white", fontSize: "15px" }}>{" "}</Table.Cell>
                </Table.Row>
                {/* Player +/- Par */}
                <Table.Row>
                    <Table.HeaderCell>+/- Par</Table.HeaderCell>
                    <RenderPlusMinus start={1} player={player} data={data} />
                </Table.Row>
            </Table.Body>
        ))}
    </Table>
)

Scorecard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string,
}

Scorecard.defaultProps = {
    data: [],
    error: ""
}

export default Scorecard;