import React, { Component } from 'react'
import { CollapsibleItem, Row, Col, Button } from 'react-materialize'

class MessageReader extends Component {
  render(){
    const { dismissReading, messages } = this.props
    const reading = messages.filter((message)=>(message.reading))[0]
    return(
       <CollapsibleItem header={reading.subject}>
         <Row>
           <Col s={12} m={12} l={12} xl={12}>
             {reading.body}
           </Col>
         </Row>
         <Row>
           <Col s={10} m={10} l={10} xl={10}></Col>
           <Col s={2} m={2} l={2} xl={2}>
             <Button onClick={()=>dismissReading()}>Dismiss</Button>
           </Col>
         </Row>
       </CollapsibleItem>
    )
  }
}

export default MessageReader
