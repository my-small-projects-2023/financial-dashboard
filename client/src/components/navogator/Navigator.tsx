import React, { useMemo } from 'react'
import RouteType from '../../models/RouteType'
import NavigatorDesktop from './NavigatorDesktop'
import NavigatorMobile from './NavigatorMobile'
import { NOT_FOUND_PATH, ROUTES } from '../../config/route-config'
import { useMediaQuery } from '@chakra-ui/react'

const Navigator = () => {

    const userData = null;
    const isLaptopOrDesktop = useMediaQuery('(min-width: 900px)')[0];

    const routes: RouteType[] = useMemo<RouteType[]>(() => 
        { return ROUTES.filter(e => (userData && e.authenticated) 
            || (!userData && !e.authenticated) && e.path !== NOT_FOUND_PATH);
    }, [userData]);
    
  return (
    <div>
        {isLaptopOrDesktop ? <NavigatorDesktop items={routes}/> : <NavigatorMobile items={routes}/>}
    </div>
  )
}

export default Navigator
