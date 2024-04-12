import React from 'react'
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

  return (
    <Box >
      <Tabs paddingY={3}>
        <TabList paddingLeft={1}>
            {items.map(e => <Link key={e.path} to={e.path}><Tab value={tabNumber}>{e.label}</Tab></Link>)}
            <div style={{width: '75vw'}}></div>
            <ColorModeSwitch />
        </TabList>
      </Tabs>
    </Box>
  )
}

export default NavigatorDesktop
