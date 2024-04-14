import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ClientData from '../../models/ClientData';
import { useSelector } from 'react-redux';
import CurrencyModel from '../../models/CurrencyModel';
import { StateType } from '../../redux/store';

const AvailableCurrencies = () => {

    const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
    const popularCurrencies: CurrencyModel[] = useSelector<StateType, CurrencyModel[]>(state => state.popularCurrencies);
    const [data, setData] = useState<CurrencyModel[]>([]);

    useEffect(() => {
        const selectedData = popularCurrencies.filter(e => !clientData.currencies.includes(e.currency));
        setData(selectedData)
    }, [popularCurrencies, clientData])
    
  return (
   <Box display="flex" justifyContent="center" flexWrap={'wrap'}>
   {
    data.map((e, i) => {
        return  <Box key={i} padding={2}>
        <Button
            size='lg'
            height='50px'
            width='180px'
            border='1px'
            borderColor='blue.500'
        >
          {e.currency}<br/>
          {e.value}
        </Button>
      </Box>
    })
   }
   </Box> 
  )
}

export default AvailableCurrencies
