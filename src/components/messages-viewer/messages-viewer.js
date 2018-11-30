import React, { Component } from 'react'
import { Collection, CollectionItem, Row, Col, Collapsible, Button } from 'react-materialize'
import ViewerToolbar from '../viewer-toolbar/viewer-toolbar'
import MessagesList from '../messages-list/messages-list'
import MessageReader from '../message-reader/message-reader'
import ComposeMessage from '../compose-message/compose-message'

class MessagesViewer extends Component {


  render(){
    const { messages, starred, checkAll, addRemoveLabel, markReadUnread, deleteMessage, setReading, dismissReading, newMessage } = this.props
    const reading = messages.filter((message)=>(message.reading))[0] || false
    const labels = ['Dev', 'Personal']
    return(
      <Collection className="container messages-viewer">
        {/* Toolbar */}
        <ViewerToolbar deleteMessage={deleteMessage} markReadUnread={markReadUnread} addRemoveLabel={addRemoveLabel} messages={messages} labels={labels} checkAll={checkAll} />
        {/* single message view :: new message view */}
        {/* MessageWindow -- wrapper for both elements */}
        {/* MessageList -- will need to adjust styling */}
        <Row style={{padding: '10px'}}>
          <Col s={1} m={1} l={1} xl={1}>Select:</Col>
          <Col s={1} m={1} l={1} xl={1}>Star:</Col>
          <Col s={10} m={10} l={10} xl={10}>Subject:</Col>
        </Row>
        {reading ? <Collapsible><MessageReader dismissReading={dismissReading} messages={messages}/></Collapsible> : <hr/>}
        {newMessage ? <ComposeMessage/> : <Button className='align-right'>New Message</Button>}
        {
          messages.map((message, idx)=>(
            <MessagesList setReading={setReading} starred={starred} checkAll={checkAll} key={idx} message={message}/>
          ))
        }
      </Collection>
    )
  }
}

export default MessagesViewer
