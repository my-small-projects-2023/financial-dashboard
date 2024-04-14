import { useEffect, useState } from 'react'
import ExchangeRate from '../components/ExchangeRate'
import { ExchangeData } from '../../models/ExchangeRateData'
import { dashboardService } from '../../config/service-config'
import { useDispatch, useSelector } from 'react-redux';
import { HStack, Tabs, TabList, Tab, Heading, Box, Spinner, Select, useMediaQuery, Button, WrapItem, Text, Flex } from '@chakra-ui/react';
import { setCurrencies, setExchangeData, setPopularCurrencies } from '../../redux/actions';
import dashboardData from '../../config/dashboard-config.json'
import { ToastContainer, toast } from 'react-toastify'
import CurrencyModel from '../../models/CurrencyModel';
import ExchangeRateComp from '../components/ExchangeRateComp';
import { CloseButton } from '@chakra-ui/react'
import SelectedCurrenciesList from '../components/SelectedCurrenciesList';
import ClientData from '../../models/ClientData';
import { StateType } from '../../redux/store';
import AvailableCurrencies from '../components/AvailableCurrencies';

const DEFAULT_KEY: string = "FX_MONTHLY";
const DEFAULT_BASE_CURRENCY = "USD";
const DEFAULT_CURRENCY = "EUR";
const ERROR_MESSAGE = 'Error occurred'


const DashboardPage = () => {

  const dispatch = useDispatch<any>();

  // const isLaptopOrDesktop = useMediaQuery('(min-width: 900px)')[0];

  const [isLoading, setIsLoading] = useState(false);
  const [toCurrency, setToCurrency] = useState(DEFAULT_CURRENCY)
  const [currentKey, setCurrentKey] = useState(DEFAULT_KEY)
  const [selectedCurrencies, setSelectedCurrencies] = useState([])


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
        <ExchangeRateComp updateData={updateData}/>
        <SelectedCurrenciesList/>
        <AvailableCurrencies/>
       


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



  
