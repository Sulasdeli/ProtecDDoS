import React from 'react'
import {Divider, Panel, Button} from "rsuite";
import {Card, CardContent, Typography} from "@material-ui/core";
import PriceTag from "./PriceTag";
import ServiceLogo from "./ServiceLogo";

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
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    }
});

const Service = ({service, index, currentPage, history}) => (
    <Panel>
        <Card style={styles.card}>
            <div style={styles.details}>
                <CardContent style={styles.content}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <ServiceLogo imageUrl={service.image} width="90px" marginRight="20px"/>
                        <div style={{width: "100vh",display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="h5" style={{fontWeight: 'bold'}}>
                                {service.serviceName}
                            </Typography>
                            <Button color="blue" appearance="ghost" onClick={() => history.push(`/explore/${service.id}`)}>More</Button>
                        </div>
                    </div>
                    <Divider/>
                    <Typography component="p" align="justify" color="textSecondary">
                        {service.description}
                    </Typography>
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