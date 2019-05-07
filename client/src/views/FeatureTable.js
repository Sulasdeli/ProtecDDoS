import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Icon} from "rsuite";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '60%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let id = 0;
function createData(name, value) {
    id += 1;
    return { id, name, value };
}

const createProtectionFeatures = (features) => {
    let protectionFeatures = [];
    features.forEach(feature => {
        protectionFeatures.push(createData(feature, true))
    });
    return protectionFeatures
};

const FeatureTable = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell style={{fontSize: "18px"}}>DDos Attack Protection</CustomTableCell>
                        <CustomTableCell align="right"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {createProtectionFeatures(props.protectionFeatures).map(row => (
                        <TableRow className={classes.row} key={row.id}>
                            <CustomTableCell component="th" scope="row" style={{fontWeight: "bold"}}>
                                {row.name}
                            </CustomTableCell>
                            <CustomTableCell align="right">
                                <Icon icon="check-square" size="lg"/>
                            </CustomTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

FeatureTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureTable);