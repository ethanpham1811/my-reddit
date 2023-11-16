import { ArrowForwardIosSharpIcon } from '@/constants/icons'
import { styled } from '@/mui'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import React, { Children, ReactNode, useEffect, useState } from 'react'
import { v4 as rid } from 'uuid'

/* wrapper */
const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  p: 0,
  display: 'flex',
  flexDirection: 'column',
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}))

/* header */
const Header = styled((props: AccordionSummaryProps & { isMobile?: boolean }) => (
  <MuiAccordionSummary expandIcon={props.isMobile && <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  padding: '1rem',
  paddingBottom: 0,
  margin: 0,
  minHeight: 'auto',
  position: 'relative',
  cursor: 'auto',
  '.MuiAccordionSummary-content': {
    margin: 0
  },
  '.MuiAccordionSummary-expandIconWrapper': {
    position: 'absolute',
    right: '15px',
    top: '50%',
    color: 'white',
    transform: 'translateY(-50%)',
    '&.Mui-expanded': {
      transform: 'translateY(-50%) rotate(90deg)'
    }
  }
}))

const Body = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '1rem',
  paddingTop: '0.5rem'
}))

const id = rid()

/**
 * @param  {boolean} isMobile // only function on mobile
 */
function RdAccordion({ children, isMobile }: { children: ReactNode; isMobile?: boolean }) {
  const defaultValue = isMobile ? false : `panel_${id}`
  const [expanded, setExpanded] = useState<string | false>(defaultValue)

  useEffect(() => {
    setExpanded(isMobile ? false : `panel_${id}`)
  }, [isMobile])

  const header = Children.toArray(children)[0]
  const content = Children.toArray(children)[1]

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    isMobile && setExpanded(newExpanded ? panel : false)
  }
  return (
    <Accordion expanded={expanded === `panel_${id}`} onChange={handleChange(`panel_${id}`)}>
      <Header isMobile={isMobile} aria-controls={`panel${id}d-content`} id={`panel${id}d-header`}>
        {header}
      </Header>
      <Body>{content}</Body>
    </Accordion>
  )
}

export default RdAccordion
