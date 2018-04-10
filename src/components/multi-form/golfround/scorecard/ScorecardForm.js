import React, { Component } from "react";
import { Grid, Input, Segment } from "semantic-ui-react";
import StrokeInput from "./StrokeInput";
import ScoreOutput from "./ScoreOutput";

class ScorecardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
      s1: "",
      s2: "",
      s3: "",
      s4: "",
      s5: "",
      s6: "",
      s7: "",
      s8: "",
      s9: "",
      s10: "",
      s11: "",
      s12: "",
      s13: "",
      s14: "",
      s15: "",
      s16: "",
      s17: "",
      s18: ""
    };
    // ??
    this.onChange = this.onChange.bind(this);
  }

  onChange = (event, name) => {
    const score = event.target.value;
    // Do score calculations here

    this.setState({ [name]: score * 2 });
  };

  render() {
    return (
      <div>
        <Segment>
          <Grid columns={11} textAlign="center" style={{ margin: "10px" }}>
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
              <Grid.Column style={{ color: "gray" }}>10</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>6</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>16</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>8</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>18</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>2</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>14</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>12</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>4</Grid.Column>
              <Grid.Column style={{ color: "gray" }}>--</Grid.Column>
            </Grid.Row>

            {/* ------------Par------------ */}
            <Grid.Row>
              <Grid.Column>Par</Grid.Column>
              <Grid.Column>4</Grid.Column>
              <Grid.Column>4</Grid.Column>
              <Grid.Column>3</Grid.Column>
              <Grid.Column>5</Grid.Column>
              <Grid.Column>3</Grid.Column>
              <Grid.Column>5</Grid.Column>
              <Grid.Column>3</Grid.Column>
              <Grid.Column>4</Grid.Column>
              <Grid.Column>4</Grid.Column>
              <Grid.Column>--</Grid.Column>
            </Grid.Row>

            {/* ------------Score------------ */}
            <Grid.Row
              verticalAlign="middle"
              style={{
                boxShadow: "0 0 10px 2px grey",
                outline: "1px solid orange"
              }}
            >
              <Grid.Column>Score</Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s1}
                  onChange={e => this.onChange(e, "s1")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s2}
                  onChange={e => this.onChange(e, "s2")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s3}
                  onChange={e => this.onChange(e, "s3")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s3}
                  onChange={e => this.onChange(e, "s4")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s3}
                  onChange={e => this.onChange(e, "s5")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s3}
                  onChange={e => this.onChange(e, "s6")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s3}
                  onChange={e => this.onChange(e, "s7")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s3}
                  onChange={e => this.onChange(e, "s8")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <StrokeInput
                  inputValue={this.state.s3}
                  onChange={e => this.onChange(e, "s9")}
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>Tot</Grid.Column>
            </Grid.Row>
            {/* ------------Poäng------------ */}
            <Grid.Row>
              <Grid.Column>Points</Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s1} />
              </Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s2} />
              </Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s3} />
              </Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s4} />
              </Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s5} />
              </Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s6} />
              </Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s7} />
              </Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s8} />
              </Grid.Column>
              <Grid.Column>
                <ScoreOutput dataSource={this.state.s9} />
              </Grid.Column>
              <Grid.Column>:D</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <Grid columns={11} textAlign="center" style={{ margin: "10px" }}>
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
              verticalAlign="middle"
              style={{
                boxShadow: "0 0 10px 2px grey",
                outline: "1px solid orange"
              }}
            >
              <Grid.Column>Score</Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>
                <Input
                  type="text"
                  fluid
                  style={{ textAlign: "center" }}
                  onChange={this.onChange}
                >
                  <input
                    style={{
                      height: "30px",
                      padding: "2px",
                      textAlign: "center"
                    }}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column style={{ padding: "0 0.5em" }}>Tot</Grid.Column>
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
        </Segment>
      </div>
    );
  }
}

export default ScorecardForm;
