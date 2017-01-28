import React, { Component } from 'react'

class Spinner extends Component {

  render() {
    var Spinner
    switch(this.props.spinnerType) {
      case "bounce":
        Spinner =
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
        break
      case "folding-cube":
        Spinner =
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
        break
      default:
        Spinner =
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
    }

    return (
      <div className="spinner-container">
        {Spinner}
      </div>
    )

  }

}

module.exports = Spinner
