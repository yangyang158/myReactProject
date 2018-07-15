import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, HashRouter, withRouter, } from 'react-router-dom';


import Siderbar from './siderbar/index.jsx'; 
import Home from './module/home/index.jsx';
import Org from './module/org/index.jsx';
import Report from './module/report/index.jsx';


let MainWithRouter = withRouter(class Index extends React.PureComponent {

    static childContextTYpes = {
        //获取当前页面的地址
        location: PropTypes.object,
    }

    getChildContext() {
        return {
            //获取当前页面的地址
            location: this.props.location,
        }
    }

    render(){
        let {location, match, history} = this.props;
        console.log('location', location)
        console.log('match', match)
        console.log('history', history)

        return(
            <HashRouter>
                <div>
                    <Siderbar />
                    <div className='module-container'>
                        <main>
                            <Switch>
                                <Route exact={true} path="/home" component={Home}/>
                                <Route exact={true} path="/org" component={Org}/>
                                <Route exact={true} path="/report" component={Report}/>
                                <Redirect to='/home' />
                            </Switch>
                        </main>
                    </div>
                </div>
            </HashRouter>
        )
    }
})


export default class MainIndex extends React.PureComponent {


    render(){
        return (
            <HashRouter>
                <MainWithRouter />
            </HashRouter>
        )
    }
};