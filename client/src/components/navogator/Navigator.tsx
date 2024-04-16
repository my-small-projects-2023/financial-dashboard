import { useMemo } from 'react'
import RouteType from '../../models/RouteType'
import NavigatorDesktop from './NavigatorDesktop'
import NavigatorMobile from './NavigatorMobile'
import { NOT_FOUND_PATH, ROUTES } from '../../config/route-config'
import { useMediaQuery } from '@chakra-ui/react'
import ClientData from '../../models/ClientData'
import { StateType } from '../../redux/store'
import { useSelector } from 'react-redux'

const Navigator = () => {

    const profile: ClientData = useSelector<StateType, ClientData>(state => state.clientData)
    // TODO
    //const isLaptopOrDesktop = useMediaQuery('(min-width: 900px)')[0];
    const isLaptopOrDesktop = true

    const routes: RouteType[] = useMemo<RouteType[]>(() => 
        { return ROUTES.filter(e => (profile.email && e.authenticated) 
            || (!profile.email && !e.authenticated) && e.path !== NOT_FOUND_PATH || e.isShown);
    }, [profile]);
    
  return (
    <div>
        {isLaptopOrDesktop ? <NavigatorDesktop items={routes}/> : <NavigatorMobile items={routes}/>}
    </div>
  )
}

export default Navigator
