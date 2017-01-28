import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import ViewContainer from '../components/ViewContainer'
import LittleBitsAPI from '../services/LittleBitsAPI'
import AlgoliaSearch from 'algoliasearch'
import _ from 'lodash'

class CreateInventionScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bitsSearchResults: [],
      materialsSearchResults: [],
      bitsSearchText: "",
      materialsSearchText: "",
      title: "",
      description: "",
      username: "",
      email: "",
      bits: [],
      materials: [],
      imageURI: ""
    }
  }

  componentWillMount() {
    var AlgoliaClient = AlgoliaSearch('FL09OOK2ZG', '905ab3b39e23d398d5fd2900ed569462')
    this.BitsSearchIndex = AlgoliaClient.initIndex('bits')
    this.MaterialsSearchIndex = AlgoliaClient.initIndex('materials')
  }

  _createInvention() {
    LittleBitsAPI.createInvention({
      title: this.state.title,
      description: this.state.description,
      username: this.state.username,
      email: this.state.email,
      bits: this.state.bits,
      materials: this.state.materials,
      imageURI: this.state.imageURI
    })
    .then((data) => {
      if(data.status === "ok") {
        browserHistory.push('/')
      } else {
        alert("Something Went Wrong...")
      }
    })

  }

  _bitsKeyDown(event) {

    if(event.which === 9 || event.which === 32 || event.which === 188 || event.which === 13) {
      event.preventDefault()
      if(this.state.bitsSearchResults[0]) {
        this._tagBit(this.state.bitsSearchResults[0].name)
      }
    }

  }

  _searchBits(text) {
    if(text === "") {
      this.setState({ bitsSearchResults: [], bitsSearchText: "" })
    } else {
      this.setState({ bitsSearchText: text })
      this.BitsSearchIndex.search(text, (error, data) => {
        this.setState({
          bitsSearchResults: data.hits
        })
      })
    }
  }

  _tagBit(bitName) {
    var newBits = this.state.bits
    newBits.push(bitName)
    this.setState({
      bits: newBits,
      bitsSearchText: "",
      bitsSearchResults: []
    })
  }

  _untagBit(bitName) {
    var newBits = this.state.bits
    _.remove(newBits, (item) => { return item === bitName })
    this.setState({
      bits: newBits,
      bitsSearchText: "",
      bitsSearchResults: []
    })
  }

  _materialsKeyDown(event) {

    if(event.which === 9 || event.which === 32 || event.which === 188 || event.which === 13) {
      event.preventDefault()
      if(this.state.materialsSearchResults[0]) {
        this._tagMaterial(this.state.materialsSearchResults[0].name)
      }

    }

  }

  _searchMaterials(text) {
    if(text === "") {
      this.setState({ materialsSearchResults: [], materialsSearchText: "" })
    } else {
      this.setState({ materialsSearchText: text })
      this.MaterialsSearchIndex.search(text, (error, data) => {
        this.setState({
          materialsSearchResults: data.hits
        })
      })
    }
  }

  _tagMaterial(materialName) {
    var newMaterials = this.state.materials
    newMaterials.push(materialName)
    this.setState({
      materials: newMaterials,
      materialsSearchText: "",
      materialsSearchResults: []
    })
  }

  _untagMaterial(materialName) {
    var newMaterials = this.state.materials
    _.remove(newMaterials, (item) => { return item === materialName })
    this.setState({
      materials: newMaterials,
      materialsSearchText: "",
      materialsSearchResults: []
    })
  }

  render() {
    var MainContent
    var BitTags = []
    var MaterialTags = []
    var BitsSearchResults = []
    var MaterialsSearchResults = []

    _.each(this.state.bits, (bitName) => {
      BitTags.push(
        <div key={bitName} className="tag">
          <p className="tagText">{bitName}</p>
          <p className="tagX" onClick={(event) => { this._untagBit(bitName) }}>X</p>
        </div>
      )
    })

    _.each(this.state.materials, (materialName) => {
      MaterialTags.push(
        <div key={materialName} className="tag">
          <p className="tagText">{materialName}</p>
          <p className="tagX" onClick={(event) => { this._untagMaterial(materialName) }}>X</p>
        </div>
      )
    })

    _.each(this.state.bitsSearchResults, (result) => {
      BitsSearchResults.push(
        <p key={result.id} className="bits-search-result">{result.name}</p>
      )
    })

    _.each(this.state.materialsSearchResults, (result) => {
      MaterialsSearchResults.push(
        <p key={result.id} className="materials-search-result">{result.name}</p>
      )
    })

    MainContent =
    <div className="main-content">
      <div className="top-space"></div>

      <h1>New Invention</h1>
      <hr style={{marginTop: "10px", marginBottom: "10px"}} />

      <div className="invention-title">
        <input className="invention-title" type="text" value={this.state.title} placeholder="Invention Title" onChange={(event) => { this.setState({title: event.target.value}) }} />
      </div>

      <div className="invention-description">
        <textarea className="invention-description" value={this.state.description} placeholder="Invention Description" onChange={(event) => { this.setState({description: event.target.value}) }} />
      </div>

      <div className="invention-username">
        <input className="invention-username" type="text" value={this.state.username} placeholder="Invention Username" onChange={(event) => { this.setState({username: event.target.value}) }} />
      </div>

      <div className="invention-email">
        <input className="invention-email" type="text" value={this.state.email} placeholder="Invention Email" onChange={(event) => { this.setState({email: event.target.value}) }} />
      </div>

      <hr style={{marginTop: "10px", marginBottom: "10px"}} />

      <div className="invention-bits">
        <p className="bits-text">Bits Used: </p>
        <div className="bits-list">{BitTags}</div>
        <div className="bits-input-container">
          <input
            className="bits-input"
            type="text"
            placeholder="Bits..."
            value={this.state.bitsSearchText}
            onChange={(event) => { this._searchBits(event.target.value) }}
            onKeyDown={(event) => { this._bitsKeyDown(event) }} />
          <div className="bits-input-dropdown">
            {BitsSearchResults}
          </div>
        </div>
      </div>

      <hr style={{marginTop: "10px", marginBottom: "10px"}} />

      <div className="invention-materials">
        <p className="materials-text">Materials Used: </p>
        <div className="materials-list">{MaterialTags}</div>
        <div className="materials-input-container">
          <input
            className="materials-input"
            type="text"
            placeholder="Materials..."
            value={this.state.materialsSearchText}
            onChange={(event) => { this._searchMaterials(event.target.value) }}
            onKeyDown={(event) => { this._materialsKeyDown(event) }} />
          <div className="materials-input-dropdown">
            {MaterialsSearchResults}
          </div>
        </div>
      </div>

      <hr style={{marginTop: "10px", marginBottom: "10px"}} />

      <div className="submit" onClick={() => { this._createInvention() }}>
        <p className="submit-text">Create Invention</p>
      </div>

    </div>

    return (
      <div className="screen create-invention">
        {MainContent}
      </div>
    )
  }

}

module.exports = CreateInventionScreen
