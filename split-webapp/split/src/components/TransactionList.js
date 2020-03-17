import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import "../App.css";

function ListItemLink(props) {
  // Creates an error due to props spreading
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListItem button component="a" {...props} />;
}

function populateBills(bills) {
  if (bills.length !== 0) {
    return bills.map(bill => (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography variant="h5">
            {bill.title}, ${bill.total}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {bill.payments.map(payment => {
            const label = `${payment.from} owes ${payment.to} $${payment.amount}`;
            return (
              <div key={payment.id}>
                <FormControlLabel
                  aria-label="Acknowledge"
                  onClick={event => event.stopPropagation()}
                  onFocus={event => event.stopPropagation()}
                  control={<Checkbox checked={payment.is_paid} />}
                  label={label}
                />
              </div>
            );
          })}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  }
  return null;
}

class TransactionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      billData: {
        bills: []
      }
    };
  }

  componentDidMount() {
    //  actual address http://0.0.0.0:1234/api/bill_data/get_bill
    fetch("/api/bill_data/get_bills") // temp
      .then(res => {
        return res.json();
      })
      .then(data => {
        // make a mapping of bills to list items here and render it below
        this.setState({
          billData: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { billData } = this.state;
    return (
      <div>
        {populateBills(billData.bills)}
        <List component="nav" aria-label="main mailbox folders">
          <Divider />
          <ListItem button>
            <ListItemLink href="#simple-list" className="TransactionSummary">
              <ListItemText primary="Ryan owes Vanessa $10" />
              <ListItemIcon>
                <PaymentIcon className="PaymentIcon" />
              </ListItemIcon>
            </ListItemLink>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemLink href="#simple-list" className="TransactionSummary">
              <ListItemText primary="Vanessa owes sean $4" />
              <ListItemIcon>
                <PaymentIcon className="PaymentIcon" />
              </ListItemIcon>
            </ListItemLink>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemLink href="#simple-list" className="TransactionSummary">
              <ListItemText primary="Ryan owes Vanessa a cat" />
              <ListItemIcon>
                <PaymentIcon className="PaymentIcon" />
              </ListItemIcon>
            </ListItemLink>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemLink href="#simple-list" className="TransactionSummary">
              <ListItemText primary="Sean owes Ryan an apology" />
              <ListItemIcon>
                <PaymentIcon className="PaymentIcon" />
              </ListItemIcon>
            </ListItemLink>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default TransactionList;
