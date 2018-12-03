import React, { Component } from 'react'
import './App.css'
import Header from '../header/header'
import MessagesViewer from '../messages-viewer/messages-viewer'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      newMessage: false
    }
  }

  async componentDidMount() {
    const response = await fetch('http://collectiveapi.herokuapp.com/api/messages')
    const json = await response.json()
    this.setState({
      ...this.state,
      messages: json
    })
    this.checkedOrIndeterminate(this.state.messages)
  }

  async componentDidChange(method, data) {
    const response = await fetch('http://collectiveapi.herokuapp.com/api/messages', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    const json = await response.json()
    console.log(json)
    this.componentDidMount()
  }

  starred(ID){
    const changedVariable = this.state.messages.filter((message)=>(message.id === ID))[0]
    changedVariable.starred = !changedVariable.starred
    const remainingArr = this.state.messages.filter((message)=>(message.id !== ID))
    const newState = [...remainingArr, changedVariable].sort((a, b)=>{return a.id > b.id})
    // api patch
    this.setState({
      ...this.state,
      messages: newState
    })
    // this.componentDidChange('PATCH', changedVariable, 'star')
    // console.log(newState)
  }

  // function checkAll
  checkAll(e){
    if(e.target.id === 'checkAll'){
      const newState = this.state.messages.map(function(message) {
        return {
          ...message,
          selected: document.getElementById(e.target.id).checked
        }
      })
      this.checkedOrIndeterminate(newState)
      this.setState({
        ...this.state,
        messages: newState
      })
    }else{
      const newState = this.state.messages.map(function(message) {
        if(message.id === JSON.parse(e.target.id)){
          return {
            ...message,
            selected: document.getElementById(e.target.id).checked
          }
        }else{
          return {
            ...message
          }
        }
      })
      this.checkedOrIndeterminate(newState)
      this.setState({
        ...this.state,
        messages: newState
      })
    }
  }

  checkedOrIndeterminate(currentState){
    const checkBox = document.getElementById('checkAll')
    const disablerInputs = document.getElementsByName('group2')
    const selected = currentState.filter((message)=>message.selected)
    const checked = selected.length === currentState.length ? true : false
    const indeterminate = selected.length > 0 && !checked ? true : false
    if(checked){
      checkBox.indeterminate = false
      checkBox.removeAttribute('indeterminate')
      setTimeout(function(){ checkBox.checked = true }, 1)
      disablerInputs.forEach((input)=>input.removeAttribute('disabled'))
    }else if (indeterminate){
      checkBox.removeAttribute('checked')
      checkBox.indeterminate = true
      disablerInputs.forEach((input)=>input.removeAttribute('disabled'))
    }else{
      checkBox.indeterminate = false
      checkBox.checked = false
      checkBox.removeAttribute('checked')
      checkBox.removeAttribute('indeterminate')
      disablerInputs.forEach((input)=>input.setAttribute('disabled', true))
    }
  }

  addRemoveLabel(bool, label){
    const filteredMessages = this.state.messages.filter((message)=>message.selected)
    if(bool && label !== ""){
      const newList = filteredMessages.map((message)=>{
        return {
          ...message,
          labels: [...message.labels, label.toLowerCase()].filter((elem, pos, arr)=>{
            return arr.indexOf(elem) === pos
          })
        }
      })
      const remainingArr = this.state.messages.filter((message)=>!message.selected)
      const newState = [...remainingArr, ...newList].sort((a, b)=>{return a.id > b.id})
      this.setState({
        ...this.state,
        messages: newState
      })
      document.getElementById('addLabel').value = ''
    }else if (!bool && label !== "") {
      const newList = filteredMessages.map((message)=>{
        return {
          ...message,
          labels: [...message.labels].filter((elem)=>elem !== label.toLowerCase())
        }
      })
      const remainingArr = this.state.messages.filter((message)=>!message.selected)
      const newState = [...remainingArr, ...newList].sort((a, b)=>{return a.id > b.id})
      this.setState({
        ...this.state,
        messages: newState
      })
      document.getElementById('removeLabel').value = ''
    }
  }

  markReadUnread(bool){
    const filteredMessages = this.state.messages.filter((message)=>message.selected).map((message)=>{
      return {
        ...message,
        read: bool
      }
    })
    const remainder = this.state.messages.filter((message)=>!message.selected)
    const newState = [...remainder, ...filteredMessages].sort((a, b)=>{return a.id > b.id})
    this.setState({
      ...this.state,
      messages: newState
    })
  }

  deleteMessage(){
    const newState = this.state.messages.filter((message)=>!message.selected)
    this.setState({
      ...this.state,
      messages: newState
    })
  }

  setReading(ID){
    const oldReading = this.state.messages.filter((message)=>message.reading)[0] || false
    const newReading = this.state.messages.filter((message)=>message.id === ID)[0]
    const remainder = this.state.messages.filter((message)=>message.id !== ID)
    let newState = this.state.messages
    if(oldReading){
      oldReading.reading = false
      newReading.reading = true
      newState = [...remainder, newReading, oldReading].sort((a, b)=>{return a.id > b.id})
    }else{
      newReading.reading = true
      newState = [...remainder, newReading].sort((a, b)=>{return a.id > b.id})
    }
    this.setState({
      ...this.state,
      messages: newState
    })
  }

  dismissReading(){
    const oldReading = this.state.messages.filter((message)=>message.reading)
    const returnVal = oldReading.map((message)=>{
      return {
        ...message,
        reading: false,
        read: true
      }
    })
    const remainder = this.state.messages.filter((message)=>!message.reading)
    const newState = [...remainder, ...returnVal].sort((a, b)=>{return a.id > b.id})
    this.setState({
      ...this.state,
      messages: newState
    })
  }

  composeMessage(bool, values){
    console.log('event fired')
    // add functionality to grab new message data in the else statement
    // this is why there is an else statement instead of simply setting state with bool
    // false will grab the values, reset them and pass the values into an object to be added into the messages array
    if(bool){
      this.setState({
        ...this.state,
        newMessage: bool
      })
    }else if (values && values.body !== '' && values.subject !== ''){
      const newMessage = {
        body: values.body,
        id: this.state.messages.length+1,
        labels: [],
        read: false,
        starred: false,
        subject: values.subject
      }
      this.setState({
        messages: [...this.state.messages, newMessage],
        newMessage: bool
      })
      this.componentDidChange('POST', newMessage)
    }else{
      this.setState({
        ...this.state,
        newMessage: bool
      })
    }
  }

  render() {
    return (
      <div className="App">
        {/* want to add styling to header to force it to stay at the top of the page and if possible reduce it's size on scroll */}
        <Header/>
        {/* MessagesViewer will contain the majority of component imports so I can probably handle most of the api calls there */}
        <MessagesViewer newMessage={this.state.newMessage} composeMessage={this.composeMessage.bind(this)} dismissReading={this.dismissReading.bind(this)} setReading={this.setReading.bind(this)} deleteMessage={this.deleteMessage.bind(this)} markReadUnread={this.markReadUnread.bind(this)} addRemoveLabel={this.addRemoveLabel.bind(this)} checkAll={this.checkAll.bind(this)} starred={this.starred.bind(this)} messages={this.state.messages} />
      </div>
    )
  }
}

export default App
