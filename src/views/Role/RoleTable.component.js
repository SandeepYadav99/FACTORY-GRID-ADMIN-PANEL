/**
 * Created by charnjeetelectrovese@gmail.com on 4/27/2020.
 */
import React, {Component} from 'react';
import {
    withStyles, Paper,
    Card, CardHeader,
    Divider, Table,
    TableBody, TableCell,
    TableContainer, TableRow
} from '@material-ui/core';
import styles from './Style.module.css';
import Checkbox from '@material-ui/core/Checkbox';

class RoleTableComponent extends Component {
    constructor(props) {
        super(props);

    }

    _renderRows() {
        const { classes} = this.props;
            return (
                <TableRow>
                    <TableCell classes={{ root: classes.tableCell}}>Modules</TableCell>
                    <TableCell classes={{ root: classes.tableCell}}><div className={styles.crud}>Read<Checkbox color={'primary'}/></div></TableCell>
                    <TableCell classes={{ root: classes.tableCell}}><div className={styles.crud}>Write<Checkbox color={'primary'}/></div></TableCell>
                    <TableCell classes={{ root: classes.tableCell}}><div className={styles.crud}>Update<Checkbox color={'primary'}/></div></TableCell>
                    <TableCell classes={{ root: classes.tableCell}}><div className={styles.crud}>Delete<Checkbox color={'primary'}/></div></TableCell>
                </TableRow>
            )
    }

    render() {
        const {classes, data} = this.props;
        return (
            <Paper>
                {/*<Card className={classes.root}>*/}
                {/*    <CardHeader*/}
                {/*        classes={{ root: classes.cardHeader }}*/}
                {/*        title="Role"*/}
                {/*    />*/}
                {/*</Card>*/}
                {/*<Divider/>*/}
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        {this._renderRows(data)}
                    </TableBody>
                    <TableBody>
                        <TableCell>Customer</TableCell>
                        <TableCell classes={{ root: classes.singleCell}}><Checkbox  color={'primary'}/></TableCell>
                        <TableCell classes={{ root: classes.singleCell}}><Checkbox  color={'primary'}/></TableCell>
                        <TableCell classes={{ root: classes.singleCell}}><Checkbox  color={'primary'}/></TableCell>
                        <TableCell classes={{ root: classes.singleCell}}><Checkbox  color={'primary'}/></TableCell>
                    </TableBody>
                </Table>
            </Paper>
        );
    }

}

const useStyle = theme => ({
    tableCell: {
        color: 'black',
        fontSize: '0.90rem',
        textTransform: 'capitalize',
    },
    cardHeader: {
        padding: '10px'
    },
    singleCell: {
        textAlign: 'center'
    }
});


export default (withStyles(useStyle, {withTheme: true})(RoleTableComponent));
