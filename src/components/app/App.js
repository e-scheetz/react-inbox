import React, { Component } from 'react'
import './App.css'
import Header from '../header/header'
import MessagesViewer from '../messages-viewer/messages-viewer'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({messages: json})
  }

  starred(ID){
    const changedVariable = this.state.messages.filter((message)=>(message.id === ID))[0]
    changedVariable.starred = !changedVariable.starred
    const remainingArr = this.state.messages.filter((message)=>(message.id !== ID))
    const newState = [...remainingArr, changedVariable].sort((a, b)=>{return a.id > b.id})
    // api patch
    this.setState({messages: newState})
    // console.log(newState)
  }

  render() {
    return (
      <div className="App">
        {/* want to add styling to header to force it to stay at the top of the page and if possible reduce it's size on scroll */}
        <Header/>
        {/* MessagesViewer will contain the majority of component imports so I can probably handle most of the api calls there */}
        <MessagesViewer starred={this.starred.bind(this)} messages={this.state.messages} />
      </div>
    )
  }
}

export default App
