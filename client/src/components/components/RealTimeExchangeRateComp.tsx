import { useEffect, useState } from 'react'
import SelectedCurrenciesList from './SelectedCurrenciesList'
import AvailableCurrencies from './AvailableCurrencies'
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import CurrencyModel from '../../models/CurrencyModel';
import RealExchangeDataModel from '../../models/RealExchangeDataModel';
import { dashboardService, profileService } from '../../config/service-config';
import { DEFAULT_BASE_CURRENCY } from '../services/DashboardServiceImpl';
import { Box, Spinner } from '@chakra-ui/react';
import { setRealTimeData, updateProfile } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify'
import ProfileData from '../../models/ProfileData';

const ERROR_MESSAGE = 'Error occurred'
const INTERVAL = 5000

const RealTimeExchangeRateComp = () => {

    const dispatch = useDispatch<any>();

    const [isLoading, setIsLoading] = useState(false)
    const popularCurrencies: CurrencyModel[] = useSelector<StateType, CurrencyModel[]>(state => state.popularCurrencies);

    useEffect(() => {
        getData()
    }, [popularCurrencies])

    const update = () => {
      getData()
    }

    useEffect(() => {
        const intervalId = setInterval(update, INTERVAL);
        return () => {
            clearInterval(intervalId)
        }
    }, [INTERVAL])

    const getData = async() => {
        const currencyList = popularCurrencies.map(e => e.currency)
        if(currencyList.length !== 0){
            const realExchangeData: RealExchangeDataModel[] 
            = await dashboardService.getRealTimeExchangeRate(DEFAULT_BASE_CURRENCY, currencyList)
            dispatch(setRealTimeData(realExchangeData))
        }
    }

    const updateProfileCurrencies = async(currencies: string[]) => {
        setIsLoading(true)
        const profile: ProfileData | null = await profileService.updateProfile(currencies) 
        if(profile){
            dispatch(updateProfile(profile))
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
    <>
    <ToastContainer />
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
        : (
            <>
              <SelectedCurrenciesList updateProfile={updateProfileCurrencies}/>
              <AvailableCurrencies updateProfile={updateProfileCurrencies}/>
            </>
        )
    }
    </>
  )
}

export default RealTimeExchangeRateComp
