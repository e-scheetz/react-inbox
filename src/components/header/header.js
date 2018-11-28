import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'

class Header extends Component{
  render(){
    return(
      <div className='container-wrapper custom'>
        <Row>
          <Col s={1} m={1} l={1} xl={1}></Col>
          <Col s={4} m={4} l={4} xl={4}><h1>React Inbox</h1></Col>
          <Col s={7} m={7} l={7} xl={7}></Col>
        </Row>
      </div>
    )
  }
}

export default Header
