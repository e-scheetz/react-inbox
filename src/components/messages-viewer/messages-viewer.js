import React, { Component } from 'react'
import { Collection, CollectionItem, Row, Col } from 'react-materialize'
import ViewerToolbar from '../viewer-toolbar/viewer-toolbar'
import MessagesList from '../messages-list/messages-list'

class MessagesViewer extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      checked: false
    }
  }
  // function checkAll
  checkAll(){
    this.setState({
      ...this.state,
      checked: document.getElementById('checkAll').checked
    })
  }

  render(){
    const { messages, starred } = this.props
    const labels = ['Dev', 'Personal']
    return(
      <Collection className="container messages-viewer">
        {/* Toolbar */}
        <ViewerToolbar labels={labels} checkAll={this.checkAll.bind(this)} />
        {/* single message view :: new message view */}
        {/* MessageWindow -- wrapper for both elements */}
        {/* MessageList -- will need to adjust styling */}
        <CollectionItem>
          <Row>
            <Col s={1} m={1} l={1} xl={1}>Select:</Col>
            <Col s={1} m={1} l={1} xl={1}>Star:</Col>
            <Col s={10} m={10} l={10} xl={10}>Subject:</Col>
          </Row>
        </CollectionItem>
        {
          messages.map((message, idx)=>(
            <MessagesList starred={starred} checkAll={this.state.checked} key={idx} message={message}/>
          ))
        }
      </Collection>
    )
  }
}

export default MessagesViewer
