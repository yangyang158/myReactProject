import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, HashRouter, withRouter, } from 'react-router-dom';


import Siderbar from './siderbar/index.jsx'; 
import Layout from './module/layout/index.jsx';
import Drag from './module/drag/index.jsx';
import Upload from './module/upload/index.jsx';


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
                    <div className="module-container">
                        <main>
                            <Switch>
                                <Route exact={true} path="/layout" component={Layout}/>
                                <Route exact={true} path="/drag" component={Drag}/>
                                <Route exact={true} path="/upload" component={Upload}/>
                                <Redirect to="/layout" />
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