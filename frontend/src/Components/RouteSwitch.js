import React from 'react';
import HomeForm from "./HomeForm";
import Login from "./LoginForm";
import AdminHome from "./AdminHome";
import Contact from "./ContactForm";
import RaffleDetails from "./RaffleDetails";
import PurchaseForm from "./PurchaseForm";
import OrderQueuePage from "./OrderQueuePage";

//Admin routes
import AddRaffleForm from "./AddRaffleForm";
import AdminRaffleDetails from "./AdminRaffleDetails";
import { Route, Switch} from "react-router-dom";
import EditRaffleForm from './EditRaffleForm';
import EditTicketForm from './EditTicketForm';

class RouteSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: props.auth
    };
    this.changeAuth = this.changeAuth.bind(this);
    this.changeRemoveAuth = this.changeRemoveAuth.bind(this);
  }

  changeAuth() {
    this.props.updateAuth();
  }

  changeRemoveAuth() {
    this.props.removeAuth();
  }

  render() {
    return (
      <div>
            <Switch >
                <Route exact path="/" ><HomeForm className="tabContent"/></Route>
                <Route exact path="/raffle/:id"  render={props => ( <RaffleDetails {...props} />)}/>
                <Route exact path="/purchase/:id"  render={props => ( <PurchaseForm {...props} />)} />
                <Route exact path="/queue/:id"  render={props => ( <OrderQueuePage {...props} />)} />
                <Route exact path="/contact" ><Contact className="tabContent"/></Route>

                {/* Admin routes */}
                <Route exact path="/login" ><Login changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/></Route>
                <Route exact path="/admin" ><AdminHome changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/></Route>
                <Route exact path="/addraffle" ><AddRaffleForm changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} className="tabContent"/></Route>
                <Route exact path="/adminraffle/:id"  render={props => ( <AdminRaffleDetails changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} {...props} />)}/>
                <Route exact path="/editraffle/:id"  render={props => ( <EditRaffleForm changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} {...props} />)}/>
                <Route exact path="/editticket/:id"  render={props => ( <EditTicketForm changeAuth={this.changeAuth} changeRemoveAuth={this.changeRemoveAuth} {...props} />)}/>
            </Switch>
      </div>
    );
  }
}

export default RouteSwitch;