import React, { useEffect, useState } from 'react'
import { Box, CloseButton, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import ClientData from '../../models/ClientData';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import CurrencyModel from '../../models/CurrencyModel';

const DEFAULT_BASE_CURRENCY = "USD";

const SelectedCurrenciesList = () => {


    const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
    const popularCurrencies: CurrencyModel[] = useSelector<StateType, CurrencyModel[]>(state => state.popularCurrencies);
    const [data, setData] = useState<CurrencyModel[]>([]);

    useEffect(() => {
        const selectedData = popularCurrencies.filter(e => clientData.currencies.includes(e.currency));
        setData(selectedData)
    }, [popularCurrencies, clientData])

  return (
    <>
    <TableContainer>
  <Table variant='simple' size='sm'>
    <Tbody>
      {data.map((e, i) => {
        return <Tr key={i}>
        <Td>{e.currency}</Td>
        <Td>{e.value}</Td>
        <Td isNumeric>25.4</Td>
        <Td>up/down 30%</Td>
        <Td><CloseButton onClick={() => {}} isDisabled={DEFAULT_BASE_CURRENCY === e.currency}/></Td>
      </Tr>
      })}
    </Tbody>
  </Table>
</TableContainer>
    </>
  )
}

export default SelectedCurrenciesList
