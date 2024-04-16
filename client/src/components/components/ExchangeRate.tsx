import { useEffect, useState } from 'react'
import ExchangeDiagram from './ExchangeDiagram'
import { HStack, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { ExchangeData } from '../../models/ExchangeRateData';

const DAYS_FILTER = 5; // 5 days
const WEEK_FILTER = 7; // 7 days
const MONTH_FILTER = 30; // 30 days
const YEAR_WEEKLY_FILTER = 52; // 52 weeks in 1 year
const YEARS_WEEKLY_FILTER = 260; // 260 weeks in 5 years
const YEAR_MONTLY_FILTER = 60; // 60 month in 5 years
const YEARS_MONTLY_FILTER = 120; // 120 month in 10 years


const DEFAULT_FILTER = 0;

const DAYLY_KEY: string = "FX_DAILY";
const WEEKLY_KEY: string = "FX_WEEKLY"
const MONTHLY_KEY: string = "FX_MONTHLY"

interface Props {
    currentKey: string;
}

const ExchangeRate = ({currentKey}: Props) => {

    const exchangeData: ExchangeData[] = useSelector<StateType, ExchangeData[]>(state => state.exchangeData);
    const [currentExchangeData, setCurrentExchangeData] = useState<ExchangeData[]>([])
    const [filter, setFilter] = useState(MONTH_FILTER);
    const [activeTab, setActiveTab] = useState(3);

    useEffect(() => {
        if(exchangeData && exchangeData.length > 0){
            setCurrentExchangeData(exchangeData)
        }
    }, [exchangeData])

    useEffect(() => {
        if(filter){
            const filteredData = exchangeData.slice(0, filter)
            exchangeData && exchangeData.length > 0 && setCurrentExchangeData(filteredData)
        } else {
            exchangeData && exchangeData.length > 0 && setCurrentExchangeData(exchangeData)
        }



    }, [filter])

  return (
    <div>
        <HStack paddingStart={10} marginStart={10}>
            <Tabs variant='soft-rounded' colorScheme='purple' index={activeTab} onChange={(index) => setActiveTab(index)}>
                <TabList>
                    <Tab onClick={() => setFilter(DAYS_FILTER)} isDisabled={currentKey !== DAYLY_KEY}>5d</Tab>
                    <Tab onClick={() => setFilter(WEEK_FILTER)} isDisabled={currentKey !== DAYLY_KEY}>1w</Tab>
                    <Tab onClick={() => setFilter(MONTH_FILTER)} isDisabled={currentKey !== DAYLY_KEY}>1m</Tab>
                    <Tab onClick={() => setFilter(DEFAULT_FILTER)}>3m</Tab>
                    <Tab onClick={() => setFilter(DEFAULT_FILTER)} isDisabled={currentKey === DAYLY_KEY}>6m</Tab>
                    <Tab onClick={() => setFilter(YEAR_WEEKLY_FILTER)} isDisabled={currentKey === DAYLY_KEY}>1y</Tab>
                    <Tab onClick={() => setFilter(currentKey === MONTHLY_KEY ? YEAR_MONTLY_FILTER : YEARS_WEEKLY_FILTER)} isDisabled={currentKey === DAYLY_KEY}>5y</Tab>
                    <Tab onClick={() => setFilter(YEARS_MONTLY_FILTER)} isDisabled={currentKey !== MONTHLY_KEY}>10y</Tab>
                </TabList>
            </Tabs>
        </HStack>
      <ExchangeDiagram data={currentExchangeData}/>
    </div>
  )
}

export default ExchangeRate
