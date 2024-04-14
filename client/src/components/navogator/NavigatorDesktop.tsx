import React, { useEffect, useState } from 'react'
import RouteType from '../../models/RouteType'
import { Tabs, TabList, Tab, Box } from '@chakra-ui/react'
import ColorModeSwitch from '../ColorModeSwitch'
import { Link, useLocation } from 'react-router-dom'
import { getRouteIndex } from '../../utils/functions'

interface Props {
    items: RouteType[]
}

const NavigatorDesktop = ({items}: Props) => {

  const location = useLocation();
  
  const getRouteIndexCallback = React.useCallback(getRouteIndex, [items, location])
  const tabNumber = getRouteIndexCallback(items, location.pathname);
  const [activeTab, setActiveTab] = useState(0);
  

  useEffect(() => {
    setActiveTab(tabNumber)
  }, [tabNumber])

  return (
    <Box >
      <Tabs paddingY={3} index={activeTab} onChange={(index) => setActiveTab(index)}>
        <TabList paddingLeft={1}>
            {items.map(e => <Link key={e.path} to={e.path}><Tab >{e.label}</Tab></Link>)}
            <div style={{width: '70vw'}}></div>
            <Box paddingRight={5}><ColorModeSwitch /></Box>
        </TabList>
      </Tabs>
    </Box>
  )
}

export default NavigatorDesktop
