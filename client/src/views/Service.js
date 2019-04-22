import React from 'react'
import {Card, CardContent, Typography, CardMedia} from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Panel} from "rsuite";

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


const Service = ({ service }) => (
    <Panel header={service.providerName}>
        <Card style={styles.card}>
            <CardMedia
                style={styles.cover}
                image="client/src/views/cloudflare.jpg"
            />
            <div style={styles.details}>
                <CardContent style={styles.content}>
                    <Typography component="h5" variant="h5">
                        {service.providerName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {service.providerName}
                    </Typography>
                </CardContent>
                <div>

                </div>
            </div>
        </Card>
    </Panel>
);

export default withStyles(styles, { withTheme: true })(Service);