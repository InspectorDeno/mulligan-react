import React from "react";
import PropTypes from "prop-types";
import { Table, Icon } from "semantic-ui-react";
import _ from "lodash";
import { find, findWhere, pick, reduce } from "underscore";

const RenderNinePoints = ({ player, start, data }) => {
  const hcp = player.playerHcp;
  const maxExtraStrokes = Math.ceil(hcp / 18);
  let extraStrokes = 0;
  let sumPoints = 0;

  const points = _.times(9, i => {
    const index = find(data.golfholes, { number: start + i }).index;
    const par = find(data.golfholes, { number: start + i }).par;
    const score = Number(
      reduce(
        pick(
          findWhere(data.scores, { hole: start + i }),
          `${player.playerName}`
        ),
        "score"
      ).score
    );

    if (index <= hcp % 18) {
      extraStrokes = maxExtraStrokes;
    } else {
      extraStrokes = maxExtraStrokes - 1;
    }
    const point = par + extraStrokes - score + 2;
    sumPoints += point;
    return <Table.Cell key={i}> {point > 0 ? point : 0}</Table.Cell>;
  });
  return points.concat(
    <Table.Cell
      style={{ background: "darkgrey", color: "white", fontSize: "15px" }}
    >
      {sumPoints}
    </Table.Cell>
  );
};

const RenderPointsSum = ({ player, data }) => {
  const netScore = findWhere(data.stats, { player: `${player.playerName}` }).scores
    .netScore;
  return (
    <Table.Cell
      style={{ background: "grey", color: "white", fontSize: "15px" }}
    >
      {netScore}
    </Table.Cell>
  );
}

const RenderNineHoles = ({ start }) => {
  let numbers = _.times(9, i => (
    <Table.HeaderCell key={i}>{start + i}</Table.HeaderCell>
  ));
  if (start === 1) {
    numbers = numbers.concat(
      <Table.HeaderCell style={{ background: "darkgrey" }} width={1}>
        Out
      </Table.HeaderCell>
    );
  } else {
    numbers = numbers.concat(
      <Table.HeaderCell style={{ background: "darkgrey" }} width={1}>
        In
      </Table.HeaderCell>
    );
  }
  return numbers;
};
const RenderNineIndexes = ({ start, holes }) => {
  const indexes = _.times(9, i => (
    <Table.Cell key={i}>{find(holes, { number: start + i }).index}</Table.Cell>
  ));
  return indexes;
};

const RenderNinePars = ({ start, holes }) => {
  let sum = 0;
  const pars = _.times(9, i => {
    const par = find(holes, { number: start + i }).par;
    sum += par;
    return <Table.Cell key={i}>{par}</Table.Cell>;
  });
  return pars.concat(
    <Table.Cell
      style={{ background: "darkgrey", color: "white", fontSize: "15px" }}
    >
      {sum}
    </Table.Cell>
  );
};

const RenderParSum = ({ holes }) => {
  let sum = 0;
  _.times(holes.length, i => {
    const par = find(holes, { number: i + 1 }).par;
    sum += par;
  });
  return (
    <Table.Cell
      style={{ background: "grey", color: "white", fontSize: "15px" }}
    >
      {sum}
    </Table.Cell>
  );
};

const RenderNineScores = ({ start, player, data }) => {
  let sum = 0;
  const scores = _.times(9, i => {
    const score = Number(
      reduce(
        pick(
          findWhere(data.scores, { hole: start + i }),
          `${player.playerName}`
        ),
        "score"
      ).score
    );
    const par = find(data.golfholes, { number: start + i }).par;

    sum += score;
    let color = "none";
    if (score - par < 0) {
      color = "gold";
    } else if (score - par === 1) {
      color = "lightgray";
    } else if (score - par >= 2) {
      color = "gray";
    }
    return (
      <Table.Cell
        key={i}
        style={{
          background: color,
          borderTop: "3px solid white",
          borderBottom: "3px solid white"
        }}
      >
        {score}
      </Table.Cell>
    );
  });
  return scores.concat(
    <Table.Cell
      style={{ background: "darkgrey", color: "white", fontSize: "15px" }}
    >
      {sum}
    </Table.Cell>
  );
};

const RenderScoreSum = ({ player, data }) => {
  const score = findWhere(data.stats, { player: `${player.playerName}` }).scores
    .grossScore;
  return (
    <Table.Cell
      style={{ background: "grey", color: "white", fontSize: "15px" }}
    >
      {score}
    </Table.Cell>
  );
};

const RenderPlusMinus = ({ start, player, data }) => {
  let sumScore1 = 0;
  let sumScore2 = 0;
  let sumPar1 = 0;
  let sumPar2 = 0;
  let diff1 = 0;
  let diff2 = 0;
  let perHole = 0;

  let plusminus = _.times(9, i => {
    const score = Number(
      reduce(
        pick(
          findWhere(data.scores, { hole: start + i }),
          `${player.playerName}`
        ),
        "score"
      ).score
    );
    const par = find(data.golfholes, { number: start + i }).par;
    sumScore1 += score;
    sumPar1 += par;
    perHole = score - par;
    diff1 = sumScore1 - sumPar1;
    return (
      <Table.Cell key={i}>
        {perHole > 0 && "+"}
        {perHole}
      </Table.Cell>
    );
  });
  plusminus = plusminus.concat(
    <Table.Cell
      style={{ background: "darkgrey", color: "white", fontSize: "15px" }}
    >
      {diff1 > 0 && "+"}
      {diff1}
    </Table.Cell>
  );
  if (data.golfholes.length === 18) {
    plusminus = plusminus.concat(
      _.times(9, i => {
        const score = Number(
          reduce(
            pick(
              findWhere(data.scores, { hole: 10 + i }),
              `${player.playerName}`
            ),
            "score"
          ).score
        );
        const par = find(data.golfholes, { number: 10 + i }).par;
        sumScore2 += score;
        sumPar2 += par;
        perHole = score - par;
        diff2 = sumScore2 - sumPar2;
        return (
          <Table.Cell key={i}>
            {perHole > 0 && "+"}
            {perHole}
          </Table.Cell>
        );
      })
    );
  }
  plusminus = plusminus.concat(
    <Table.Cell
      style={{ background: "darkgrey", color: "white", fontSize: "15px" }}
    >
      {diff2 > 0 && "+"}
      {diff2}
    </Table.Cell>
  );
  return plusminus.concat(
    <Table.Cell
      style={{ background: "grey", color: "white", fontSize: "15px" }}
    >
      {diff1 + diff2 > 0 && "+"}
      {diff1 + diff2}
    </Table.Cell>
  );
};

const Scorecard = ({ data }) => (
  <Table
    celled
    size="small"
    compact
    collapsing
    unstackable
    textAlign="center"
    style={{ margin: "10px" }}
  >
    <Table.Body>
      {/* Hole numbers */}
      <Table.Row style={{ background: "grey", color: "white" }}>
        <Table.HeaderCell>Hole</Table.HeaderCell>
        <RenderNineHoles start={1} />
        <RenderNineHoles start={10} />
        <Table.HeaderCell style={{ background: "grey" }} width={1}>
          Sum
        </Table.HeaderCell>
      </Table.Row>

      {/* Indexes */}
      <Table.Row disabled>
        <Table.HeaderCell>Index</Table.HeaderCell>
        <RenderNineIndexes start={1} holes={data.golfholes} />
        <Table.Cell
          style={{ background: "darkgrey", color: "white", fontSize: "15px" }}
        >
          {" "}
        </Table.Cell>
        <RenderNineIndexes start={10} holes={data.golfholes} />
        <Table.Cell
          style={{ background: "darkgrey", color: "white", fontSize: "15px" }}
        >
          {" "}
        </Table.Cell>
        <Table.Cell
          style={{ background: "grey", color: "white", fontSize: "15px" }}
        >
          {" "}
        </Table.Cell>
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
          <Table.HeaderCell
            colSpan={4}
            style={{ background: "lightblue", textAlign: "left", border: "none" }}
          >
            <Icon name="user" />
            {player.playerName}
          </Table.HeaderCell>
          <Table.HeaderCell
            colSpan={5}
            style={{ background: "lightblue", textAlign: "left", border: "none" }}
          >
            Hcp Round: {player.hcpRound ? "Yes" : "No"}
          </Table.HeaderCell>
          <Table.HeaderCell
            colSpan={data.golfholes.length === 18 ? 13 : 3}
            style={{ background: "lightblue", textAlign: "left", border: "none" }}
          >
            Hcp: {player.playerHcp}
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
          <RenderNinePoints start={1} data={data} player={player} />
          <RenderNinePoints start={10} data={data} player={player} />
          <RenderPointsSum data={data} player={player} />
        </Table.Row>
        {/* Player +/- Par */}
        <Table.Row>
          <Table.HeaderCell style={{ padding: 0 }}>+/- Par</Table.HeaderCell>
          <RenderPlusMinus start={1} player={player} data={data} />
        </Table.Row>
      </Table.Body>
    ))}
  </Table>
);

Scorecard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string
};

Scorecard.defaultProps = {
  data: [],
  error: ""
};

export default Scorecard;
