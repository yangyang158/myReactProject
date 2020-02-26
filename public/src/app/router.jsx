import React, {lazy, Suspense} from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, HashRouter, withRouter, } from 'react-router-dom';
import DynamicImport from './module/dynamic-import/index'
import Siderbar from './siderbar/index.jsx'; 

// import Layout from './module/layout/index.jsx';
// import Drag from './module/drag/index.jsx';
// import Upload from './module/upload/index.jsx';
// import Date from './module/date/index.jsx';
import D3Study from './module/d3-study/index.jsx';
import MapTalks from './module/maptalks/index.jsx';

const LayoutPage = lazy(() => import(/* webpackChunkName: 'Layout' */ './module/layout/index.jsx'))
const UploadPage = lazy(() => import(/* webpackChunkName: 'Upload' */ './module/upload/index.jsx'))

const Layout = function (props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LayoutPage />
        </Suspense>
    )
}
const Upload = function () {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UploadPage />
        </Suspense>
    )
}

const Drag = function () {
    return (
        <DynamicImport load={() => import(/* webpackChunkName: 'Drag' */ './module/drag/index.jsx')} />
    )
}
const Date = function () {
    return (
        <DynamicImport load={() => import(/* webpackChunkName: 'Date' */ './module/date/index.jsx')} />
    )
}


let MainWithRouter = withRouter(class Index extends React.Component {

    render(){
        let {location, match, history} = this.props;

        return(
            <HashRouter>
                <div>
                    <Siderbar />
                    <div className="module-container">
                        <main>
                            <Switch>
                                <Route exact={true} path="/layout" component={Layout}/>
                                <Route exact={true} path="/drag" component={Drag}/>
                                <Route exact={true} path="/upload" component={Upload} />
                                <Route exact={true} path="/date" component={Date} />
                                <Route exact={true} path="/d3-study" component={D3Study} />
                                <Route exact={true} path="/maptalks" component={MapTalks} />
                                <Redirect to="/date" />
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
}