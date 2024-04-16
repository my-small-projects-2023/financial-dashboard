import { useEffect, useState } from 'react'
import { CloseButton, Stat, StatArrow, StatHelpText, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import RealExchangeDataModel from '../../models/RealExchangeDataModel';
import { getPercentage, parseDouble } from '../../utils/functions';
import ProfileData from '../../models/ProfileData';

const DEFAULT_BASE_CURRENCY = "USD";

interface Props {
  updateProfile: (currencies: string[]) => void 
}

const SelectedCurrenciesList = ({updateProfile}: Props) => {


  const profile: ProfileData = useSelector<StateType, ProfileData>(state => state.profileData);
  const [currentData, setCurrentData] = useState<RealExchangeDataModel[]>([])
  const realTimeData: RealExchangeDataModel[] = useSelector<StateType, RealExchangeDataModel[]>(state => state.realTimeData);

  useEffect(() => {
    if(profile.email && realTimeData.length !== 0){
      const selectedData = realTimeData.filter(e => profile.currencies.includes(e.currency));
      setCurrentData(selectedData)
    }
  }, [profile, realTimeData])

  const handleUpdate = (currency: string) => {
    const currencies = profile.currencies.filter(e => e !== currency);
    updateProfile(currencies);
  }

  return (
    <>
    <TableContainer>
  <Table variant='simple' size='sm'>
    <Tbody>
      {currentData.map((e, i) => {
        return <Tr key={i}>
        <Td style={{fontWeight: 'bold'}}>{e.currency}</Td>
        <Td>{parseDouble(e.currentValue)}</Td>
        <Td >
          {parseDouble(e.prevValue - e.currentValue)}</Td>
        <Td >
          <Stat>
          <StatHelpText>
      <StatArrow type={getPercentage(e.prevValue, e.currentValue) >= 0 ? 'increase' : 'decrease'} />
      {Math.abs(getPercentage(e.prevValue, e.currentValue))} %
    </StatHelpText>
          </Stat>
        </Td>
        <Td><CloseButton onClick={() => handleUpdate(e.currency)} isDisabled={DEFAULT_BASE_CURRENCY === e.currency}/></Td>
      </Tr>
      })}
    </Tbody>
  </Table>
</TableContainer>
    </>
  )
}

export default SelectedCurrenciesList
