import React from 'react'
import {Divider, Panel, Button, Icon} from "rsuite";
import {Card, CardContent, Typography} from "@material-ui/core";
import PriceTag from "./PriceTag";
import ServiceLogo from "./ServiceLogo";
import styled from 'styled-components'

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
    }
});

const RecommendedIcon = styled.div`
  background: linear-gradient(60deg,#ef5350,#e53935);
  box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(244,67,54,.4);
  display: flex;
  justify-content: center;
  width: 40px;
  border-radius: 50px;
`;

const SeeMoreButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
                            { index === 0 && currentPage === 1 ? (
                                <RecommendedIcon>
                                    <Icon icon="fire" style={{color: "white", padding: 10}} size={"lg"}/>
                                </RecommendedIcon>
                            ): (null)}
                        </div>
                    </div>
                    <Divider/>
                    <Typography component="p" align="justify" color="textSecondary">
                        {service.description}
                    </Typography>
                    <SeeMoreButton>
                        <Button color="blue" appearance="ghost" onClick={() => history.push(`/explore/${service.id}`)}>see More</Button>
                    </SeeMoreButton>
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
