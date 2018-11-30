import React, { Component } from 'react'
import { Collection, CollectionItem, Row, Col } from 'react-materialize'
import ViewerToolbar from '../viewer-toolbar/viewer-toolbar'
import MessagesList from '../messages-list/messages-list'

class MessagesViewer extends Component {


  render(){
    const { messages, starred, checkAll, addRemoveLabel, markReadUnread, deleteMessage } = this.props
    const labels = ['Dev', 'Personal']
    return(
      <Collection className="container messages-viewer">
        {/* Toolbar */}
        <ViewerToolbar deleteMessage={deleteMessage} markReadUnread={markReadUnread} addRemoveLabel={addRemoveLabel} messages={messages} labels={labels} checkAll={checkAll} />
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
            <MessagesList starred={starred} checkAll={checkAll} key={idx} message={message}/>
          ))
        }
      </Collection>
    )
  }
}

export default MessagesViewer
