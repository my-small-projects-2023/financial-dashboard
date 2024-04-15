import { HStack, Tabs, TabList, Tab, Select, Text, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ExchangeRate from './ExchangeRate'
import CurrencyModel from '../../models/CurrencyModel';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';

const DEFAULT_KEY: string = "FX_MONTHLY";
const DAYLY_KEY: string = "FX_DAILY";
const WEEKLY_KEY: string = "FX_WEEKLY"
const MONTHLY_KEY: string = "FX_MONTHLY"
const DEFAULT_BASE_CURRENCY = "USD";

interface Props {
    updateData: (currentData: string) => void
}

const ExchangeRateComp = ({updateData}: Props) => {

    const isLaptopOrDesktop = useMediaQuery('(min-width: 900px)')[0];
    const popularCurrencies: CurrencyModel[] = useSelector<StateType, CurrencyModel[]>(state => state.popularCurrencies);
  
    const [currentKey, setCurrentKey] = useState(DEFAULT_KEY)
    const [activeTab, setActiveTab] = useState(2);
  
  
    useEffect(() => {
      updateData(currentKey)
    }, [currentKey])
    
  return (
    <>
    <HStack paddingStart={10} marginStart={10}>
          <Tabs variant='soft-rounded' colorScheme='blue' index={activeTab} onChange={(index) => setActiveTab(index)}>
            <TabList>
              <Tab onClick={() => setCurrentKey(DAYLY_KEY)}>Daily</Tab>
              <Tab onClick={() => setCurrentKey(WEEKLY_KEY)}>Weekly</Tab>
              <Tab onClick={() => setCurrentKey(MONTHLY_KEY)}>Monthly</Tab>
              {
                isLaptopOrDesktop ? (<div style={{width: '25vw'}}></div>) : (<br/>)
              }   
              <Text fontSize='xl' fontWeight='bold' paddingTop={1}>Base:</Text>   
              <HStack paddingX={5}>
                <Select placeholder={DEFAULT_BASE_CURRENCY} isDisabled={true}>
                  {
                    popularCurrencies.map((e, i) => {
                      return <option value={e.currency} key={i}>{e.currency}</option>
                    })
                  }
                </Select>
              </HStack>
           </TabList>
          </Tabs>
        </HStack>

        <ExchangeRate currentKey={currentKey}/>
    </>
  )
}

export default ExchangeRateComp
