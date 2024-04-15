import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import RealExchangeDataModel from '../../models/RealExchangeDataModel';
import ProfileData from '../../models/ProfileData';
import { getPercentage, parseDouble } from '../../utils/functions';
import { DEFAULT_BASE_CURRENCY } from '../services/DashboardServiceImpl';

interface Props {
  data: RealExchangeDataModel[],
  updateProfile:(currencies: string[]) => void
}
const AvailableCurrencies = ({data, updateProfile}: Props) => {

    const profile: ProfileData = useSelector<StateType, ProfileData>(state => state.profileData);
    const [currentData, setCurrentData] = useState<RealExchangeDataModel[]>([])

    useEffect(() => {
        if(profile.email){
          const selectedData = data.filter(e => !profile.currencies.includes(e.currency));
          setCurrentData(selectedData)
        }
    }, [profile])

    const handleUpdate = (currency: string) => {
      const currencies = [...profile.currencies]
      currencies.push(currency)
      updateProfile(currencies)
    }
    
  return (
   <Box display="flex" justifyContent="center" flexWrap={'wrap'}>
   {
    currentData.map((e, i) => {
        return  <Box key={i} padding={2}>
        <Button
            size='lg'
            height='60px'
            width='180px'
            border='1px'
            borderColor={getPercentage(e.prevValue, e.currentValue) >= 0 ? 'green.500' : 'red.500'}
            onClick={() => handleUpdate(e.currency)}
            style={{ fontSize: '14px', textAlign: 'left' }}
        >
          {DEFAULT_BASE_CURRENCY} / {e.currency}<br/>
          {parseDouble(e.currentValue)}<br/>
          {getPercentage(e.prevValue, e.currentValue) >= 0 ? '↑' : '↓'} {Math.abs(getPercentage(e.prevValue, e.currentValue))} %
        </Button>
      </Box>
    })
   }
   </Box> 
  )
}

export default AvailableCurrencies
