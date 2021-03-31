import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar, NavbarBrand} from 'reactstrap'
import Menu from './components/MenuComponent';
import {DISHES} from './shared/dishes';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {

    render() {
        return(
            //     <div>
            // <Navbar dark color="primary">
            //          <div className="container">
            //            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
            //          </div>
            //        </Navbar>
            //        <Menu dishes={this.state.dishes}/>
            //     </div> 
            <Provider store={store}>
            <BrowserRouter>
              <div className="App">
                <Main />
              </div>
            </BrowserRouter>
          </Provider>

        );
    }
}

export default App;
