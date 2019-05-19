import React from 'react'
import {Highcharts3dChart, withHighcharts, XAxis, YAxis, ZAxis, Tooltip, ScatterSeries, Scatter3dSeries}
    from 'react-jsx-highcharts'
import Highcharts from 'highcharts';
import addHighcharts3DModule from 'highcharts/highcharts-3d';
import styled from "styled-components";
import {Card} from "@material-ui/core";
import CardHeader from "./CardHeader";
addHighcharts3DModule(Highcharts);

const ChartContainer = styled.div`
  margin-bottom: 45px;
`;

const ScatterPlot = ({services, userIndex}) => (
    <ChartContainer>
        <Card style={{borderRadius: "10px 10px 10px 10px"}}>
            <CardHeader title='Scatter Plot' backgroundColor='linear-gradient(0deg, #66bb6a, #43a047)'/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Highcharts3dChart alpha="20" beta="20" depth="270">
                        <Tooltip/>
                        <XAxis min={0}>
                            <XAxis.Title style={{fontWeight: "bold", fontSize: 15}} margin={40}>Deployment Time</XAxis.Title>
                        </XAxis>
                        <YAxis min={0}>
                            <YAxis.Title style={{fontWeight: "bold", fontSize: 15}} margin={40}>Leasing Period</YAxis.Title>
                        </YAxis>
                        <ZAxis min={0}>
                            <ZAxis.Title style={{fontWeight: "bold", fontSize: 15}} skex3d={true} margin={-400}>Budget</ZAxis.Title>
                            <Scatter3dSeries name="User Profile Index" color={"red"} data={[userIndex]}/>

                            {services.map((s, i) => <ScatterSeries key={i} name={s.providerName} data={[JSON.parse(s.weightedSimilarity)]}/>)}
                        </ZAxis>
                    </Highcharts3dChart>

            </div>
        </Card>
    </ChartContainer>
);

export default withHighcharts(ScatterPlot, Highcharts);

