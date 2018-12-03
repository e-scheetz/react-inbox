import React, { Component } from 'react'
import { CollectionItem, Row, Col, Input, Button } from 'react-materialize'

class ComposeMessage extends Component {
  constructor(props){
    super(props)
    this.state = {
      subject: '',
      body: ''
    }
  }

  onInputChange = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  reset = (bool) => {
    this.props.composeMessage(bool, {subject: this.state.subject, body: this.state.body})
    this.setState({subject: '', body: ''})
  }

  render(){
    return(
      <CollectionItem header=''>
        <Row>
          <Col s={12} m={12} l={12} xl={12}>
            <h5>Compose New Message:</h5>
          </Col>
        </Row>
        <Row>
          <Input name='subject' value={this.state.subject} onChange={this.onInputChange} label="Subject" s={12} m={12} l={12} xl={12} type='text'/>
        </Row>
        <Row>
          <Input name='body' value={this.state.body} onChange={this.onInputChange} label="Body" s={12} m={12} l={12} xl={12} type='textarea'/>
        </Row>
        <Row>
          <Col s={6} m={6} l={6} xl={6}></Col>
          <Col s={3} m={3} l={3} xl={3}>
            <Button onClick={()=>this.reset(false)}>Discard</Button>
          </Col>
          <Col s={3} m={3} l={3} xl={3}>
            <Button onClick={()=>this.reset(false)}>Send</Button>
          </Col>
        </Row>
      </CollectionItem>
    )
  }
}

export default ComposeMessage
