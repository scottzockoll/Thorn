import {Grid} from '@material-ui/core';
import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function NewRuleButton() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid item>
                <Button fullWidth variant="contained" color="primary">
                    New Rule
                </Button>
            </Grid>
        </div>
    )
}

function DeleteRuleButton() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid item>
                <Button fullWidth variant="contained" color="secondary">
                    Del
                </Button>
            </Grid>
        </div>
    )
}


function Rule() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container direction={"row"} spacing={2}>
                    <Grid item sm={5}>
                        <TextField id="outlined-basic" label="Rule" variant="outlined"/>
                    </Grid>
                    <Grid item sm={5}>
                        <TextField id="outlined-basic" label="Value" variant="outlined"/>
                    </Grid>
                    <Grid item sm={2}>
                        <DeleteRuleButton/>
                    </Grid>
                </Grid>

            </form>
        </div>
    )
}

// function NumberList(props) {
//     const [amount, setAmount] = useState(props.amount);
//     console.log(amount)
//     // console.log(ruleList)
//     return (
//         <div></div>
//     );
// }


export default function Rules() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <NewRuleButton/>
                        <Rules />
                        {/*<NumberList number={3} />*/}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
            </Grid>
        </div>
    );
}
