import React from 'react';
import { Segment, Header, Grid, Divider } from "semantic-ui-react";

const RoundStats = ({ data }) => (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map(stats => (
            <Segment.Group style={{ margin: "10px", minWidth: "370px", maxWidth: "450px" }}>
                <Segment inverted color="orange" style={{ padding: "5px" }}>
                    <Header textAlign="center">{stats.player}</Header>
                </Segment>
                <Segment>
                    <Divider hidden style={{ margin: "5px" }} />
                    <Grid columns="equal">
                        <Grid.Row style={{ padding: "0 " }}>
                            <Grid.Column>
                                <b>Gross Score</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.scores.grossScore}
                            </Grid.Column>
                            <Grid.Column>
                                <b>Putts</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.scores.putts}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: "0 " }}>
                            <Grid.Column>
                                <b>Net Score</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.scores.netScore}
                            </Grid.Column>
                            <Grid.Column>
                                <b>Penalties</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.scores.penalties}
                            </Grid.Column>
                        </Grid.Row>
                        <Divider style={{ margin: "5px" }} />
                        <Grid.Row style={{ padding: "0" }}>
                            <Grid.Column>
                                <b>FIR</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.regulations.fir} ({Math.round(stats.regulations.firpercent * 1000) / 10} %)
                        </Grid.Column>
                            <Grid.Column>
                                <b>GIR</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.regulations.gir} ({Math.round(stats.regulations.girpercent * 1000) / 10} %)
                        </Grid.Column>
                        </Grid.Row>
                        <Divider style={{ margin: "5px" }} />
                        <Grid.Row style={{ padding: "0" }}>
                            <Grid.Column>
                                <b>Pars</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.strokeTerms.pars}
                            </Grid.Column>
                            <Grid.Column>
                                <b>Bogies</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.strokeTerms.bogies}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: "0 " }}>
                            <Grid.Column>
                                <b>Birdies</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.strokeTerms.birdies}
                            </Grid.Column>
                            <Grid.Column>
                                <b>D.Bogies</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.strokeTerms.dbogies}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: "0 " }}>
                            <Grid.Column>
                                <b>Eagles</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.strokeTerms.eagles}
                            </Grid.Column>
                            <Grid.Column>
                                <b>Worse</b>
                            </Grid.Column>
                            <Grid.Column>
                                {stats.strokeTerms.worse}
                            </Grid.Column>
                        </Grid.Row>
                        <Divider style={{ margin: "5px" }} />
                        <Grid.Row style={{ padding: "0 " }}>
                            <Grid.Column>
                                <b>Par3 avg</b>
                            </Grid.Column>
                            <Grid.Column>
                                {Math.round(stats.averages.par3avg * 100) / 100}
                            </Grid.Column>
                            <Grid.Column>
                                <b>Par5 avg</b>
                            </Grid.Column>
                            <Grid.Column>
                                {Math.round(stats.averages.par5avg * 100) / 100}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ padding: "0 " }}>
                            <Grid.Column>
                                <b>Par4 avg</b>
                            </Grid.Column>
                            <Grid.Column>
                                {Math.round(stats.averages.par4avg * 100) / 100}
                            </Grid.Column>
                            <Grid.Column />
                            <Grid.Column />
                        </Grid.Row>
                        <Divider hidden style={{ margin: "5px" }} />
                    </Grid>
                </Segment>
            </Segment.Group>
        ))}
    </div>

)

export default RoundStats;