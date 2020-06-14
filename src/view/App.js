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

import Courseboard from './Courseboard'
import Skipped from './Skipped'
import Status from './Status'

export default function App () {
  return (
    <Container>
      <Row>
        <Col>
          <CurriculumProvider>
            <ReportsProvider>
              <StudentsProvider>
                <Courseboard />

                <Skipped />
                <Status status='Blocked' />
                <Status status='Waiting' />
                <Status status='Working' />
              </StudentsProvider>
            </ReportsProvider>
          </CurriculumProvider>
        </Col>
      </Row>
    </Container>
  )
}
