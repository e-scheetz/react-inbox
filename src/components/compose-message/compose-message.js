import React, { Component } from 'react'
import { CollapsibleItem, Row, Col, Input, Button } from 'react-materialize'

class ComposeMessage extends Component {
  render(){
    return(
      <CollapsibleItem header='Compose New Message:'>
        <Row>
          <Col s={12} m={12} l={12} xl={12}>
            <Input type='text'/>
          </Col>
        </Row>
        <Row>
          <Col s={12} m={12} l={12} xl={12}>
            <Input type='textarea'/>
          </Col>
        </Row>
        <Row>
          <Col s={8} m={8} l={8} xl={8}></Col>
          <Col s={2} m={2} l={2} xl={2}>
            <Button>Discard</Button>
          </Col>
          <Col s={2} m={2} l={2} xl={2}>
            <Button>Send</Button>
          </Col>
        </Row>
      </CollapsibleItem>
    )
  }
}

export default ComposeMessage
