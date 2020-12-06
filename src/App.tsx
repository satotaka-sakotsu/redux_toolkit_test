import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Counter } from './modules/counter/Counter';
import { TodoContainer } from './modules/todo/TodoContainer';
import NotFound from './modules/notFound/NotFound';
import Home from './modules/home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              component={Home}
            />
            <Route
              path="/counter"
              exact
              component={Counter}
            />
            <Route
              path="/todo"
              exact
              component={TodoContainer}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
