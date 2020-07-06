import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";

import AddProduct from "./components/add-product.component";
import ProductsList from "./components/products-list.component";

import AddKit from "./components/add-kit.component";
import KitsList from "./components/kits-list.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user.user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }


  render() {
    const {currentUser} = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/#" className="navbar-brand">
              Product Kit
            </a>
            <div className="navbar-nav mr-aurto">
              {currentUser && (
                <Fragment>
                <li className="nav-item">
                  <Link to={"/products"} className="nav-link">
                    Produto
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/kits"} className="nav-link">
                    Kits
                  </Link>
                </li>
                </Fragment>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Sair
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Registrar
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/add" component={AddProduct} />
              <Route exact path="/products" component={ProductsList} />
              <Route exact path="/kits/add" component={AddKit} />
              <Route exact path="/kits" component={KitsList} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
