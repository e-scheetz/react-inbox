import React, { Component } from 'react'
import { CollectionItem, Row, Col, Input, Icon } from 'react-materialize'

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
          <Col s={1} m={1} l={1} xl={1}>
            <Input name='group1' type='checkbox' label=" " checked={checkAll} />
          </Col>
          <Col onClick={()=>starred(message.id)} s={1} m={1} l={1} xl={1}><Icon>{message.starred ? "star_border" : "star"}</Icon></Col>
          <Col className="valign" style={truncate} s={10} m={10} l={10} xl={10}>{message.subject}</Col>
        </Row>
      </CollectionItem>
    )
  }
}

export default MessagesList
