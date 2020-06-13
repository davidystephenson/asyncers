import React from 'react'

import Section from './Section'
import Table from './Table'

export default function Figure ({
  data,
  keyName,
  title
}) {
  return (
    <Section title={title}>
      <Table data={data} keyName={keyName} />
    </Section>
  )
}
