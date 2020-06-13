import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { CurriculumProvider } from '../lib/curriculum'
import { ReportProvider } from '../lib/report'

import Checkboard from './Checkboard'
import Waiting from './Waiting'

export default function App () {
  return (
    <Container>
      <Row>
        <Col>
          <CurriculumProvider>
            <ReportProvider>
              <Waiting />

              <Checkboard />
            </ReportProvider>
          </CurriculumProvider>
        </Col>
      </Row>
    </Container>
  )
}
