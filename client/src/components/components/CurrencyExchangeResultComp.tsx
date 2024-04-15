import { CloseButton, Box, Text, Card, CardBody, TableContainer, Table, Tbody, Tr, Td } from '@chakra-ui/react'
import { ConversionResult } from './CurrencyExchangeComp'

interface Props {
    close: () => void
    conversionResult: ConversionResult
}

const CurrencyExchangeResultComp = ({conversionResult, close}: Props) => {
  return (
    <Box>
            <Card>
  <CardBody>
  <Box display={'flex'} justifyContent={'right'}>
  <CloseButton onClick={close} size='lg'/>
  </Box>
  <TableContainer>
  <Table variant='simple'>
    <Tbody>
      <Tr> 
        <Td>Base</Td>
        <Td>  <Text color='blue.300' fontSize='xl' display='inline'>
    {conversionResult.base}
  </Text></Td>
      </Tr>
      <Tr>
        <Td>Target</Td>
        <Td>
        <Text color='blue.300' fontSize='xl' display='inline'>
        {conversionResult.target}
        </Text>
        </Td>
      </Tr>
      <Tr>
        <Td>Rate</Td>
        <Td>
        <Text color='blue.300' fontSize='xl' display='inline'>
        {conversionResult.rate}
        </Text>
        </Td>
      </Tr>
      <Tr>
        <Td>Amount</Td>
        <Td>        <Text color='blue.300' fontSize='xl' display='inline'>
        {conversionResult.amount}
        </Text></Td>
      </Tr>
      <Tr>
        <Td>Total</Td>
        <Td>
        <Text color='blue.300' fontSize='xl' display='inline'>
        {conversionResult.result}
        </Text>
        </Td>
      </Tr>

    </Tbody>
  </Table>
</TableContainer>

  </CardBody>
</Card>
          </Box>
  )
}

export default CurrencyExchangeResultComp
