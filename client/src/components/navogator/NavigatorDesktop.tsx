import React from 'react'
import RouteType from '../../models/RouteType'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box, Spacer, Flex } from '@chakra-ui/react'
import ColorModeSwitch from '../ColorModeSwitch'
import { relative } from 'path'
import { Link } from 'react-router-dom'

interface Props {
    items: RouteType[]
}

const NavigatorDesktop = ({items}: Props) => {
  return (
    <Box >
      <Tabs paddingY={3}>
  <TabList paddingLeft={1}>
    {items.map(e => <Tab key={e.path}><Link to={e.path}>{e.label}</Link></Tab>)}
    <div style={{width: '75vw'}}></div>
    <ColorModeSwitch />
  </TabList>
</Tabs>
    </Box>
  )
}

export default NavigatorDesktop
