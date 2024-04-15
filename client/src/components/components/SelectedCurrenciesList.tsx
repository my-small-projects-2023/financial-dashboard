import { useEffect, useState } from 'react'
import { Badge, CloseButton, Stat, StatArrow, StatHelpText, StatNumber, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import RealExchangeDataModel from '../../models/RealExchangeDataModel';
import { getPercentage, parseDouble } from '../../utils/functions';
import ProfileData from '../../models/ProfileData';

const DEFAULT_BASE_CURRENCY = "USD";

interface Props {
  data: RealExchangeDataModel[],
  updateProfile: (currencies: string[]) => void 
}

const SelectedCurrenciesList = ({data, updateProfile}: Props) => {


  const profile: ProfileData = useSelector<StateType, ProfileData>(state => state.profileData);
  const [currentData, setCurrentData] = useState<RealExchangeDataModel[]>([])

  useEffect(() => {
    if(profile.email){
      const selectedData = data.filter(e => profile.currencies.includes(e.currency));
      setCurrentData(selectedData)
    }
  }, [profile])

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
