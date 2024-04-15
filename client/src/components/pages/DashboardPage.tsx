import { useEffect, useState } from 'react'
import { ExchangeData } from '../../models/ExchangeRateData'
import { dashboardService } from '../../config/service-config'
import { useDispatch } from 'react-redux';
import { Heading, Box, Spinner, GridItem, Grid, useBreakpointValue } from '@chakra-ui/react';
import { setCurrencies, setExchangeData, setPopularCurrencies } from '../../redux/actions';
import dashboardData from '../../config/dashboard-config.json'
import { ToastContainer, toast } from 'react-toastify'
import CurrencyModel from '../../models/CurrencyModel';
import ExchangeRateComp from '../components/ExchangeRateComp';
import RealTimeExchangeRateComp from '../components/RealTimeExchangeRateComp';
import CurrencyExchangeComp from '../components/CurrencyExchangeComp';

const DEFAULT_KEY: string = "FX_MONTHLY";
const DEFAULT_BASE_CURRENCY = "USD";
const DEFAULT_CURRENCY = "EUR";
const ERROR_MESSAGE = 'Error occurred'


const DashboardPage = () => {

  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [toCurrency, setToCurrency] = useState(DEFAULT_CURRENCY)
  const [currentKey, setCurrentKey] = useState(DEFAULT_KEY)

  useEffect(() => {
    getData()
    getCurrency()
  }, [])
  
  const updateData = async(key: string) => {
    setCurrentKey(key);
    await getData()
  }

  const getData = async() => {
    setIsLoading(true)
    const data = await dashboardService.getExchangeRate(currentKey, DEFAULT_BASE_CURRENCY, DEFAULT_CURRENCY);
    if(data) {
      const keys: string[] = Object.keys(data);
    const rateDataArray: ExchangeData[] = Object.entries(data[keys[1]]).map(([date, values]) => {
      const typedValues = values as { [key: string]: string };
      return {
          date,
          [toCurrency]: typedValues["4. close"].toLowerCase()
      };
    });
    dispatch(setExchangeData(rateDataArray))
    } else {
      toast.error(ERROR_MESSAGE, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light"
      })
    }
    setIsLoading(false)
  }

  const getCurrency = async() => {
    setIsLoading(true);
    const data = await dashboardService.getCurrenciesList();
    if(data) {
      const currencyArray: CurrencyModel[] = 
        Object.entries(data.rates).map(([currency, value]) => ({
          currency,
          value: value as number
      }));
      dispatch(setCurrencies(currencyArray))
      const filteredCurrencies: CurrencyModel[] = 
        currencyArray.filter((e: CurrencyModel) => dashboardData.popularCurrencies.includes(e.currency));
      dispatch(setPopularCurrencies(filteredCurrencies))
    } else {
      toast.error(ERROR_MESSAGE, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light"
      })
    }
    setIsLoading(false)
  }

  return (
    <div>
      <ToastContainer />
      <Box display="flex" justifyContent="center" paddingY={5}>
        <Heading as='h3' size='lg'>
          Exchange rate charts
        </Heading>
      </Box>
      {
      isLoading 
      ? (
        <Box display="flex" justifyContent="center" paddingTop={5}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Box>
        ) 
      : (<>
          <Grid
            templateAreas={{
              base: `"diagram diagram"
                "exchange exchange"
                "real-time real-time"`,
              lg: `"diagram exchange"
                "real-time real-time"`
            }}
            gridTemplateColumns={'70% 30%'}
            gap='1'
            fontWeight='bold'
          >
            <GridItem  area={'diagram'}>
              <ExchangeRateComp updateData={updateData}/>
            </GridItem>
            <GridItem   area={'exchange'}>
              <CurrencyExchangeComp/>
            </GridItem>
            <GridItem  area={'real-time'}>
              <RealTimeExchangeRateComp/>
            </GridItem>
          </Grid>
        </>)
      }
    </div>
  )
}

export default DashboardPage

  // const rateDataArray: RateData[] = Object.entries(currentData[keys[1]]).map(([date, values]) => {
  //     const typedValues = values as { [key: string]: string }; // Type annotation for values
  //     return {
  //         date,
  //         open: typedValues["1. open"],
  //         high: typedValues["2. high"],
  //         low: typedValues["3. low"],

  //         close: typedValues["4. close"]
  //     };
  // });
  // setData(prevData => [...prevData, {from: from, to: to, rateData: rateDataArray}]);



  
