import React, {Component} from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
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
            <div className="test">
                <h1>aaaaaaaaaaa</h1>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
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
