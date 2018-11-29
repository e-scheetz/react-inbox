import React, { Component } from 'react'
import { CollectionItem, Row, Col, Button, Input, Icon } from 'react-materialize'

class ViewerToolbar extends Component{
  render(){
    const { checkAll, labels } = this.props
    return(
      <CollectionItem>
        <Row className='valign-wrapper'>
          <Col className='valign' s={1} m={1} l={1} xl={1}><Input name='group1' id='checkAll' type='checkbox' label=" " onChange={()=>checkAll()} /></Col>
          <Col className='valign' s={3} m={3} l={3} xl={3}><Button waves='light'>Mark as Read</Button></Col>
          <Col className='valign' s={3} m={3} l={3} xl={3}><Button waves='light'>Mark as Unread</Button></Col>
          <Col className='valign' s={2} m={2} l={2} xl={2}>
            <Input type='select' defaultValue="" onChange={()=>null}>
              <option value="">Apply Label</option>
              {labels.map((label, idx)=>(
                <option key={idx} value={label}>{label}</option>
              ))}
            </Input>
          </Col>
          <Col className='valign' s={2} m={2} l={2} xl={2}>
            <Input type='select' defaultValue="" onChange={()=>null}>
              <option value="">Remove Label</option>
              {labels.map((label, idx)=>(
                <option key={idx} value={label}>{label}</option>
              ))}
            </Input>
          </Col>
          <Col className='valign' s={2} m={2} l={2} xl={2}>
            <Button waves='light'><Icon>delete</Icon></Button>
          </Col>
        </Row>
      </CollectionItem>
    )
  }
}

export default ViewerToolbar
