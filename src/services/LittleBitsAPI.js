var Q = require('q')

class LittleBitsAPI {

  constructor(config) {
    this.endpoint = config.endpoint
  }

  // Queries
  // =====================
  getInventions() {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`${this.endpoint}/inventions`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  getInvention({id}) {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`${this.endpoint}/inventions/${id}`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  getBits() {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`${this.endpoint}/bits`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  getMaterials() {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`${this.endpoint}/materials`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  // Actions
  // =====================
  createInvention({title, description, username, email, bits, materials, imageURI}) {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")

    var apiData = {
      title: title,
      description: description,
      username: username,
      email: email,
      bits: bits,
      materials: materials,
      imageURI: imageURI
    }

    var fetchConfig = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(apiData)
    }

    fetch(`${this.endpoint}/inventions/create`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise

  }

}

// module.exports = new LittleBitsAPI({endpoint: "http://localhost:3005"})
module.exports = new LittleBitsAPI({endpoint: "http://littlebits-backend.herokuapp.com"})
