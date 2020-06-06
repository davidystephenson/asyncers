import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Curriculum from './Curriculum'
import Reader from './Reader'
import Progress from './Progress'

export default function App () {
  return (
    <Container>
      <Row>
        <Col>
          <Progress />

          <Reader />

          <Curriculum />
        </Col>
      </Row>
    </Container>
  )
}
