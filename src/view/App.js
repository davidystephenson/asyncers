import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import {
  CurriculumProvider,
  ReportsProvider,
  StudentsProvider
} from '../lib'

import Agenda from './Agenda'
import Courseboard from './Courseboard'

export default function App () {
  return (
    <Container fluid>
      <Row>
        <Col>
          <CurriculumProvider>
            <ReportsProvider>
              <StudentsProvider>
                <Agenda />
                <Courseboard />
              </StudentsProvider>
            </ReportsProvider>
          </CurriculumProvider>
        </Col>
      </Row>
    </Container>
  )
}
