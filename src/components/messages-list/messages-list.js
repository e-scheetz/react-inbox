import React, { Component } from 'react'
import { CollectionItem, Row, Col, Input, Icon, Chip } from 'react-materialize'

class MessagesList extends Component {

  render(){
    const { message, checkAll, starred } = this.props
    const truncate = {
      overflow: 'hidden',
      fontSize:'1.2em'
    }
    return(
      <CollectionItem>
        <Row className='valign-wrapper'>
          <Col s={1} m={1} l={1} xl={1} >
            <Input id={JSON.stringify(message.id)} name='group1' type='checkbox' label=" " checked={message.selected} onClick={(e)=>checkAll(e, message)} />
          </Col>
          <Col onClick={()=>starred(message.id)} s={1} m={1} l={1} xl={1}><Icon>{message.starred ? "star_border" : "star"}</Icon></Col>
          <Col className="valign" style={truncate} s={10} m={10} l={10} xl={10}>{message.labels ? message.labels.map((label, idx)=><Chip key={idx}>{label}</Chip>) : null}{message.read ? message.subject : <b>{message.subject}</b>}</Col>
        </Row>
      </CollectionItem>
    )
  }
}

export default MessagesList
