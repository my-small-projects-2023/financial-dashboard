import React, { useMemo } from 'react'
import RouteType from '../../models/RouteType'
import NavigatorDesktop from './NavigatorDesktop'
import NavigatorMobile from './NavigatorMobile'
import { NOT_FOUND_PATH, ROUTES } from '../../config/route-config'
import { useMediaQuery } from '@chakra-ui/react'
import ClientData from '../../models/ClientData'
import { StateType } from '../../redux/store'
import { useSelector } from 'react-redux'

const Navigator = () => {

    const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData)
    const isLaptopOrDesktop = useMediaQuery('(min-width: 900px)')[0];

    const routes: RouteType[] = useMemo<RouteType[]>(() => 
        { return ROUTES.filter(e => (clientData.email && e.authenticated) 
            || (!clientData.email && !e.authenticated) && e.path !== NOT_FOUND_PATH || e.isShown);
    }, [clientData]);
    
  return (
    <div>
        {isLaptopOrDesktop ? <NavigatorDesktop items={routes}/> : <NavigatorMobile items={routes}/>}
    </div>
  )
}

export default Navigator
