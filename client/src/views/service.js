import styled from 'styled-components'
import React from 'react'
import {Divider, Panel, Button} from "rsuite";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import PriceTag from "./PriceTag";

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

const Service = ({service, index, currentPage, history}) => (
    <Panel>
        <Card style={styles.card}>
            <CardMedia
                style={styles.cover}
            />
            <div style={styles.details}>
                <CardContent style={styles.content}>
                    <div>
                        <Typography component="h6" variant="h6" style={{fontWeight: 'bold', display: "flex", justifyContent: "space-between"}}>
                            {service.providerName + ': ' + service.serviceName}
                            <Button color="blue" appearance="ghost" onClick={() => history.push(`/explore/${service.id}`)}>More</Button>
                        </Typography>
                        <Divider/>
                        <Typography component="p" color="textSecondary">
                            {service.description}
                        </Typography>
                    </div>
                    <Divider/>

                    <div style={{marginTop: 30, display: "flex", justifyContent: "space-between"}}>
                        <div>
                            <span style={{fontWeight: "bold"}}>
                            Deployment time: {service.deployment}
                            </span>
                            <Divider vertical />
                            <span style={{fontWeight: "bold"}}>
                            Leasing Period: {service.leasingPeriod}
                            </span>
                            <Divider vertical />
                        </div>
                        <PriceTag service={service} index={index} pageNumber={currentPage}/>
                    </div>
                </CardContent>
            </div>
        </Card>
    </Panel>
);

export default Service