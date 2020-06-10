import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { CurriculumProvider } from '../lib/curriculum'
import report, { ReportProvider } from '../lib/report'

import Curriculum from './Curriculum'
import Reports from './Reports'
import Progress from './Progress'

export default function App () {
  return (
    <Container>
      <Row>
        <Col>
          <CurriculumProvider>
            <ReportProvider>
              <Reports context={report} />

              <Progress />
            </ReportProvider>

            <Curriculum />
          </CurriculumProvider>
        </Col>
      </Row>
    </Container>
  )
}
