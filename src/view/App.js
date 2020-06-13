import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import {
  CurriculumProvider, ReportsProvider
} from '../lib'

import Checkboard from './Checkboard'
import Waiting from './Waiting'

export default function App () {
  return (
    <Container>
      <Row>
        <Col>
          <CurriculumProvider>
            <ReportsProvider>
              <Waiting />

              <Checkboard />
            </ReportsProvider>
          </CurriculumProvider>
        </Col>
      </Row>
    </Container>
  )
}
