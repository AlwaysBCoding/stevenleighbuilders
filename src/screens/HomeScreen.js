import React, { Component } from 'react'
import { Link } from 'react-router'
import Spinner from '../components/Spinner'
import LittleBitsAPI from '../services/LittleBitsAPI'
import _ from 'lodash'

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoadingData: true,
      inventions: []
    }
  }

  componentWillMount() {
    LittleBitsAPI.getInventions()
    .then((data) => {
      this.setState({
        isLoadingData: false,
        inventions: data
      })
    })
  }

  render() {
    var MainContent, Actions
    var Inventions = []

    if(this.state.isLoadingData) {
      MainContent =
      <div className="main-content">
        <div className="top-space"></div>
        <Spinner />
      </div>

      Actions =
      <div />
    } else {
      _.each(this.state.inventions, (invention) => {
        Inventions.push(
          <Link key={invention.id} to={`/inventions/${invention.id}`}>
            <p className="invention">{invention.title}</p>
          </Link>
        )
      })

      MainContent =
      <div className="main-content">
        <div className="top-space"></div>
        <h1>Inventions List</h1>
        <hr style={{marginTop: "10px", marginBottom: "25px", height: "1px", width: "100%", backgroundColor: "white"}} />
        {Inventions}
      </div>

      Actions =
      <div className="actions-container">
        <Link to="/inventions/create">
          <p>Add New Invention</p>
        </Link>
      </div>
    }

    return (
      <div className="screen home-screen inventions-index">
        {MainContent}
        <hr style={{marginTop: "10px", marginBottom: "50px", height: "1px", width: "100%", backgroundColor: "white"}} />
        {Actions}
      </div>
    )

  }

}

module.exports = HomeScreen
