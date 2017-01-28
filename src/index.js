import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { EventEmitter } from 'events'
import ViewContainer from './components/ViewContainer'
import HomeScreen from './screens/HomeScreen'

import './styles/App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    // Event Listeners
    // =====================
    this.eventEmitter = new EventEmitter()
  }

  render() {
    return (
      <ViewContainer>
        {React.cloneElement(this.props.children, {
          eventEmitter: this.eventEmitter
        })}
      </ViewContainer>
    )
  }

}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeScreen}></IndexRoute>
    </Route>
  </Router>,
  document.getElementById('root')
);
