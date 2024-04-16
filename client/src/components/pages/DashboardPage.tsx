import { useEffect, useState } from 'react'
import { ExchangeData } from '../../models/ExchangeRateData'
import { dashboardService } from '../../config/service-config'
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Box, Spinner, GridItem, Grid } from '@chakra-ui/react';
import { setCurrencies, setExchangeData, setPopularCurrencies } from '../../redux/actions';
import dashboardData from '../../config/dashboard-config.json'
import { ToastContainer, toast } from 'react-toastify'
import CurrencyModel from '../../models/CurrencyModel';
import ExchangeRateComp from '../components/ExchangeRateComp';
import RealTimeExchangeRateComp from '../components/RealTimeExchangeRateComp';
import CurrencyExchangeComp from '../components/CurrencyExchangeComp';
import { DEFAULT_BASE_CURRENCY } from '../../services/DashboardServiceImpl';
import { StateType } from '../../redux/store';
import ProfileData from '../../models/ProfileData';

const DEFAULT_KEY: string = "FX_MONTHLY";
const ERROR_MESSAGE = 'Error occurred'

const DashboardPage = () => {

  const profile: ProfileData = useSelector<StateType, ProfileData>(state => state.profileData);
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentKey, setCurrentKey] = useState(DEFAULT_KEY)

  useEffect(() => {
    if(profile.email){
      getHistoryData()
    }
  }, [currentKey, profile])

  useEffect(() => {
    if(profile.email){
      getCurrency()
    }
  }, [profile])
  
  const updateData = async(key: string) => {
    setCurrentKey(key);
  }

  const getHistoryData = async() => {
    setIsLoading(true)
    if(profile && profile.currencies.length > 0){
       const data = await dashboardService.getExchangeRate(currentKey, DEFAULT_BASE_CURRENCY, profile.currencies[0]);
      if(data) {
        const initialArrayData: ExchangeData[]  = parseInitialData(data)
        if(profile.currencies.length > 1){
          const fullArrayData: ExchangeData[] = await getProfileHistoryData(initialArrayData)
          dispatch(setExchangeData(fullArrayData))
        } else {
          dispatch(setExchangeData(initialArrayData))
        } 
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
    }
    
    setIsLoading(false)
  }

  const getProfileHistoryData = async(initialData: ExchangeData[]) => {
    let res: ExchangeData[] = [];
    for(let i = 1; i < profile.currencies.length; i++){
      const data = await dashboardService.getExchangeRate(currentKey, DEFAULT_BASE_CURRENCY, profile.currencies[i]);
      const parsedData: { [key: string]: any }[] = parseData(data, i);
      res = initialData.flatMap((e) => {
        return {
          ...e,[profile.currencies[i]]: Object.values(parsedData[i])[0]
        }
      });
    }
    return res
  }

  const parseData = (data: any, index: number): ExchangeData[] => {
    const keys: string[] = Object.keys(data);
    const res: ExchangeData[] = Object.entries(data[keys[1]]).map(([date, values]) => {
      const typedValues = values as { [key: string]: string };
      return {
        [profile.currencies[0]]: typedValues["4. close"].toLowerCase()
      };
    });

    return res
  }
  const parseInitialData = (data: any): ExchangeData[] => {
    const keys: string[] = Object.keys(data);
    const res: ExchangeData[] = Object.entries(data[keys[1]]).map(([date, values]) => {
      const typedValues = values as { [key: string]: string };
      return {
        date,
        [profile.currencies[0]]: typedValues["4. close"].toLowerCase()
      };
    });

    return res
  };

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


  
