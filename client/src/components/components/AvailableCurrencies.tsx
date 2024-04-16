import { Box, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import RealExchangeDataModel from '../../models/RealExchangeDataModel';
import ProfileData from '../../models/ProfileData';
import { getPercentage, parseDouble } from '../../utils/functions';
import { DEFAULT_BASE_CURRENCY } from '../../services/DashboardServiceImpl';

interface Props {
  updateProfile:(currencies: string[]) => void
}
const AvailableCurrencies = ({updateProfile}: Props) => {

  const realTimeData: RealExchangeDataModel[] = useSelector<StateType, RealExchangeDataModel[]>(state => state.realTimeData);
    const profile: ProfileData = useSelector<StateType, ProfileData>(state => state.profileData);
    const [currentData, setCurrentData] = useState<RealExchangeDataModel[]>([])

    useEffect(() => {
        if(profile.email && realTimeData.length !== 0){
          const selectedData = realTimeData.filter(e => !profile.currencies.includes(e.currency));
          setCurrentData(selectedData)
        }
    }, [profile, realTimeData])

    const handleUpdate = (currency: string) => {
      const currencies = [...profile.currencies]
      currencies.push(currency)
      updateProfile(currencies)
    }
    
  return (
   <Box display="flex" justifyContent="center" flexWrap={'wrap'}>
   {
    currentData.map((e, i) => {
        return  <Box key={i} paddingX={10} margin={3}             
          border='1px'
          borderRadius={15}
        borderColor={getPercentage(e.prevValue, e.currentValue) >= 0 ? 'green.300' : 'red.300'}
        onClick={() => handleUpdate(e.currency)}>
          <StatGroup>
  <Stat>
    <StatLabel>{DEFAULT_BASE_CURRENCY} / {e.currency}</StatLabel>
    <StatNumber>{parseDouble(e.currentValue)}</StatNumber>
    <StatHelpText>
      <StatArrow type={getPercentage(e.prevValue, e.currentValue) >= 0 ? 'increase' : 'decrease'} />
      {Math.abs(getPercentage(e.prevValue, e.currentValue))} %
    </StatHelpText>
  </Stat>
</StatGroup>
      </Box>
    })
   }
   </Box> 
  )
}

export default AvailableCurrencies
