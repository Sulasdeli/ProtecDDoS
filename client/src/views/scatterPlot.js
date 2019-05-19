import React from 'react'
import {Highcharts3dChart, Chart, withHighcharts, XAxis, YAxis, ZAxis, Title, Subtitle, ScatterSeries}
        from 'react-jsx-highcharts'
import Highcharts from 'highcharts';
import addHighcharts3DModule from 'highcharts/highcharts-3d';
import styled from "styled-components";
import {Card} from "@material-ui/core";
import CardHeader from "./CardHeader";
addHighcharts3DModule(Highcharts);


const getData = (services, userIndex) =>{
    let data = [userIndex];
    services.forEach( s => data.push(JSON.parse(s.weightedSimilarity)));
    return data
};

const ChartContainer = styled.div`
  margin-bottom: 45px;
`;

const ScatterPlot = ({services, userIndex}) => (
    <ChartContainer>
        <Card style={{borderRadius: "10px 10px 10px 10px"}}>
            <CardHeader title='Scatter Plot' iconName='vcard-o' backgroundColor='linear-gradient(60deg, #66bb6a, #43a047)'/>
            <Highcharts3dChart alpha="20" beta="25" depth="100">

                <XAxis min={0}>
                    <XAxis.Title>Deployment Time</XAxis.Title>
                </XAxis>
                <YAxis min={0}>
                    <YAxis.Title>Leasing Period</YAxis.Title>
                </YAxis>
                <ZAxis min={0}>
                    <ZAxis.Title>Budget</ZAxis.Title>
                    <ScatterSeries data={getData(services,userIndex)} />
                </ZAxis>
            </Highcharts3dChart>
        </Card>
    </ChartContainer>
);

export default withHighcharts(ScatterPlot, Highcharts);

