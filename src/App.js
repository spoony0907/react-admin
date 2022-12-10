import React, {Component} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
// 引用组件
import Login from './views/login/Index';

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact component={Login} path="/"/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;