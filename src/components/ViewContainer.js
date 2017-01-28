import React, { Component } from 'react'

class ViewContainer extends Component {

  render() {
    var styles = Object.assign({}, this.props.styles)

    return (
      <div className="view-container" style={styles}>
        {this.props.children}
      </div>
    )

  }

}

module.exports = ViewContainer
