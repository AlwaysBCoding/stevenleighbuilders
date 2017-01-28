import React, { Component } from 'react'
import { Link } from 'react-router'
import Spinner from '../components/Spinner'
import LittleBitsAPI from '../services/LittleBitsAPI'
import _ from 'lodash'

class InventionShowScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoadingData: true,
      invention: {}
    }
  }

  componentWillMount() {
    var inventionId = this.props.location.pathname.split('/')[2]
    LittleBitsAPI.getInvention({id: inventionId})
    .then((data) => {
      this.setState({
        isLoadingData: false,
        invention: data
      })
    })
  }

  render() {
    var MainContent
    var Bits = []
    var Materials = []

    if(this.state.isLoadingData) {
      MainContent =
      <div className="main-content">
        <div className="top-space"></div>
        <Spinner />
      </div>
    } else {
      _.each(this.state.invention.bits, (bit) => {
        Bits.push(
          <p key={bit.id} className="bit">{bit.name}</p>
        )
      })

      _.each(this.state.invention.materials, (material) => {
        Materials.push(
          <p key={material.id} className="material">{material.name}</p>
        )
      })

      MainContent =
      <div className="main-content">
        <div className="top-space"></div>
        <div className="invention">

          <p className="invention-title">{this.state.invention.title}</p>
          <hr style={{marginTop: "10px", marginBottom: "10px"}} />
          <p className="invention-description">{this.state.invention.description}</p>
          <hr style={{marginTop: "10px", marginBottom: "10px"}} />
          <p className="invention-user">{`${this.state.invention.username} | ${this.state.invention.email}`}</p>
          <hr style={{marginTop: "10px", marginBottom: "50px"}} />

          <h1>Bits Used:</h1>
          <div className="bits">
            {Bits}
          </div>

          <hr style={{marginTop: "10px", marginBottom: "50px"}} />

          <h1>Materials Used:</h1>
          <div className="materials">
            {Materials}
          </div>

        </div>
      </div>
    }
    return (
      <div className="screen invention-show">
        {MainContent}
      </div>
    )
  }

}

module.exports = InventionShowScreen
