import React, { Component } from "react";
import { Grid, Input } from "semantic-ui-react";

class ScorecardForm extends Component {
  state = {
    done: false
  };

  onChange = e => console.log(e);

  render() {
    return (
      <div>
        <TheForm />
      </div>
    );
  }
}

const FirstNineComponent = () => (
  <div>
    <Grid celled internally columns={11} textAlign="center">
      {/* ------------Hål------------ */}
      <Grid.Row color="grey">
        <Grid.Column>Hole</Grid.Column>
        <Grid.Column>1</Grid.Column>
        <Grid.Column>2</Grid.Column>
        <Grid.Column>3</Grid.Column>
        <Grid.Column>4</Grid.Column>
        <Grid.Column>5</Grid.Column>
        <Grid.Column>6</Grid.Column>
        <Grid.Column>7</Grid.Column>
        <Grid.Column>8</Grid.Column>
        <Grid.Column>9</Grid.Column>
        <Grid.Column>Out</Grid.Column>
      </Grid.Row>

      {/* ------------Index------------ */}

      <Grid.Row>
        <Grid.Column style={{ color: "gray" }}>Index</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>1</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>2</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>3</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>4</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>5</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>6</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>7</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>8</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>9</Grid.Column>
        <Grid.Column style={{ color: "gray" }}>10</Grid.Column>
      </Grid.Row>

      {/* ------------Par------------ */}
      <Grid.Row>
        <Grid.Column>Par</Grid.Column>
        <Grid.Column>1</Grid.Column>
        <Grid.Column>2</Grid.Column>
        <Grid.Column>3</Grid.Column>
        <Grid.Column>4</Grid.Column>
        <Grid.Column>5</Grid.Column>
        <Grid.Column>6</Grid.Column>
        <Grid.Column>7</Grid.Column>
        <Grid.Column>8</Grid.Column>
        <Grid.Column>9</Grid.Column>
        <Grid.Column>10</Grid.Column>
      </Grid.Row>

      {/* ------------Score------------ */}
      <Grid.Row
        style={{
          "box-shadow": "0 0 10px 2px grey",
          outline: "1px solid orange"
        }}
      >
        <Grid.Column>Score</Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input
            type="text"
            fluid
            style={{ margin: "auto" }}
            onChange={this.onChange}
          />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>Tot</Grid.Column>
      </Grid.Row>
      {/* ------------Poäng------------ */}
      <Grid.Row>
        <Grid.Column>Points</Grid.Column>
        <Grid.Column>1</Grid.Column>
        <Grid.Column>2</Grid.Column>
        <Grid.Column>3</Grid.Column>
        <Grid.Column>4</Grid.Column>
        <Grid.Column>5</Grid.Column>
        <Grid.Column>6</Grid.Column>
        <Grid.Column>7</Grid.Column>
        <Grid.Column>8</Grid.Column>
        <Grid.Column>9</Grid.Column>
        <Grid.Column>10</Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);
const SecondNineComponent = () => (
  <div>
    <Grid celled internally columns={11}>
      {/* ------------Hål------------ */}
      <Grid.Row color="grey">
        <Grid.Column>Hole</Grid.Column>
        <Grid.Column>10</Grid.Column>
        <Grid.Column>11</Grid.Column>
        <Grid.Column>12</Grid.Column>
        <Grid.Column>13</Grid.Column>
        <Grid.Column>14</Grid.Column>
        <Grid.Column>15</Grid.Column>
        <Grid.Column>16</Grid.Column>
        <Grid.Column>17</Grid.Column>
        <Grid.Column>18</Grid.Column>
        <Grid.Column>Out</Grid.Column>
      </Grid.Row>

      {/* ------------Index------------ */}

      <Grid.Row>
        <Grid.Column>Index</Grid.Column>
        <Grid.Column>10</Grid.Column>
        <Grid.Column>11</Grid.Column>
        <Grid.Column>12</Grid.Column>
        <Grid.Column>13</Grid.Column>
        <Grid.Column>14</Grid.Column>
        <Grid.Column>15</Grid.Column>
        <Grid.Column>16</Grid.Column>
        <Grid.Column>17</Grid.Column>
        <Grid.Column>18</Grid.Column>
        <Grid.Column>*</Grid.Column>
      </Grid.Row>

      {/* ------------Par------------ */}
      <Grid.Row>
        <Grid.Column>Par</Grid.Column>
        <Grid.Column>10</Grid.Column>
        <Grid.Column>11</Grid.Column>
        <Grid.Column>12</Grid.Column>
        <Grid.Column>13</Grid.Column>
        <Grid.Column>14</Grid.Column>
        <Grid.Column>15</Grid.Column>
        <Grid.Column>16</Grid.Column>
        <Grid.Column>17</Grid.Column>
        <Grid.Column>18</Grid.Column>
        <Grid.Column>*</Grid.Column>
      </Grid.Row>

      {/* ------------Score------------ */}
      <Grid.Row style={{ outline: "solid 1px #ff851b" }}>
        <Grid.Column>Score</Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>
          <Input type="text" fluid style={{ margin: "auto" }} />
        </Grid.Column>
        <Grid.Column style={{ padding: "0.5em" }}>Tot</Grid.Column>
      </Grid.Row>

      {/* ------------Poäng------------ */}
      <Grid.Row style={{ fontstyle: "bold" }}>
        <Grid.Column>Points</Grid.Column>
        <Grid.Column>1</Grid.Column>
        <Grid.Column>2</Grid.Column>
        <Grid.Column>3</Grid.Column>
        <Grid.Column>4</Grid.Column>
        <Grid.Column>5</Grid.Column>
        <Grid.Column>6</Grid.Column>
        <Grid.Column>7</Grid.Column>
        <Grid.Column>8</Grid.Column>
        <Grid.Column>9</Grid.Column>
        <Grid.Column>10</Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const TheForm = () => (
  <div>
    <FirstNineComponent />
    <SecondNineComponent />
  </div>
);

export default ScorecardForm;
