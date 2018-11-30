import React, { Component } from 'react'
import { CollectionItem, Row, Col, Button, Input, Icon } from 'react-materialize'

class ViewerToolbar extends Component{
  render(){
    const { checkAll, labels, addRemoveLabel, messages, markReadUnread, deleteMessage } = this.props
    return(
      <CollectionItem>
        <Row className='valign-wrapper'>
          <Col className='valign' s={1} m={1} l={1} xl={1}><Input id='checkAll' type='checkbox' label=" " onChange={(e)=>checkAll(e)} /></Col>
          <Col className='valign' s={3} m={3} l={3} xl={3}><Button name='group2' waves='light' onClick={()=>markReadUnread(true)}>Mark as Read</Button></Col>
          <Col className='valign' s={3} m={3} l={3} xl={3}><Button name='group2' waves='light' onClick={()=>markReadUnread(false)}>Mark as Unread</Button></Col>
          <Col className='valign' s={2} m={2} l={2} xl={2}>
            <Input name='group2' id="addLabel" type='select' defaultValue="" onChange={()=>addRemoveLabel(true, document.getElementById('addLabel').value)}>
              <option value="">Apply Label</option>
              {labels.map((label, idx)=>(
                <option key={idx} value={label}>{label}</option>
              ))}
            </Input>
          </Col>
          <Col className='valign' s={2} m={2} l={2} xl={2}>
            <Input name='group2' id='removeLabel' type='select' defaultValue="" onChange={()=>addRemoveLabel(false, document.getElementById('removeLabel').value)}>
              <option value="">Remove Label</option>
              {labels.map((label, idx)=>(
                <option key={idx} value={label}>{label}</option>
              ))}
            </Input>
          </Col>
          <Col className='valign' s={1} m={1} l={1} xl={1}>
            <Button onClick={()=>deleteMessage()} name='group2' waves='light'><Icon>delete</Icon></Button>
          </Col>
          <Col className='valign' s={1} m={1} l={1} xl={1}>
            Unread: {messages.filter((message)=>message.read === false).length}
          </Col>
        </Row>
      </CollectionItem>
    )
  }
}

export default ViewerToolbar
