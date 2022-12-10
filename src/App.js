import React, {Component} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import './App.scss';
// 引用组件
import Home from './views/Home';
import About from './views/About';
import News from './views/News';

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div class="test">
                <h1>aaaaaaaaaaa</h1>
                <HashRouter>
                    <Switch>
                        <Route exact component={Home} path="/"/>
                        <Route component={About} path="/about"/>
                        <Route component={News} path="/news"/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default App;
