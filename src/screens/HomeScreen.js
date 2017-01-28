import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import Spinner from '../components/Spinner'
import _ from 'lodash'

class Carousel extends Component {

  render() {
    return (
      <div className="image-carousel">
        <ReactCSSTransitionGroup
          transitionName="carousel"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={true}
          transitionEnterTimeout={1000}
          transitionLeave={false}>
          <img key={this.props.imageSource} className="active-carousel-image" src={this.props.imageSource} />
        </ReactCSSTransitionGroup>
      </div>
    )
  }

}

class HomeScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeImageIndex: 0
    }
    this.images = [
      "../assets/images/PON.jpg",
      "../assets/images/PON2.jpg",
      "../assets/images/MIL.png",
      "../assets/images/MIL2.jpg",
      "../assets/images/MIL3.jpg",
      "../assets/images/HAY.png",
      "../assets/images/HAY2.jpg",
      "../assets/images/CLA.png"
    ]
  }

  componentDidMount() {
    this.interval = setInterval(
      this._cycleImageNatural.bind(this), 10000
    )
  }

  _cycleImageNatural() {
    var counter = this.state.activeImageIndex
    if (counter >= (this.images.length - 1)) {
      this.setState({ activeImageIndex: 0 })
    } else {
      this.setState({ activeImageIndex: counter + 1 })
    }
  }

  _cycleImage() {
    var counter = this.state.activeImageIndex
    if (counter >= (this.images.length - 1)) {
      this.setState({ activeImageIndex: 0 })
    } else {
      this.setState({ activeImageIndex: counter + 1 })
    }
    clearInterval(this.interval)
    this.interval = setInterval(
      this._cycleImageNatural.bind(this), 10000
    )
  }

  render() {
    var MainContent

    MainContent =
    <div className="main-content">
      <div className="top-space"></div>
      <div className="title-text-container">
        <div className="title-text">
          <p>STEVEN LEIGH</p>
          <p>BUILDER</p>
        </div>
      </div>
      <div className="image-carousel" onClick={() => { this._cycleImage() }}>
        <Carousel imageSource={this.images[this.state.activeImageIndex]} />
      </div>
      <div className="footer">
        <div className="footer-content">
          <p className="item address">PO BOX 877 LOCUST VALLEY NY 11560</p>
          <p className="divider">|</p>
          <p className="item phone">TEL (516) 214-0412</p>
          <p className="divider">|</p>
          <p className="item email">INFO@STEVENLEIGHBUILDERS.COM</p>
        </div>
      </div>
    </div>

    return (
      <div className="screen home-screen">
        {MainContent}
      </div>
    )

  }

}

module.exports = HomeScreen
