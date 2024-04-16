import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Spinner, Stack, WrapItem, CardBody, Card } from '@chakra-ui/react';
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import CurrencyModel from '../../models/CurrencyModel';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { dashboardService } from '../../config/service-config';
import CurrencyExchangeResultComp from './CurrencyExchangeResultComp';

type Inputs = {
    base: string,
    target: string,
    amount: number
}

export interface ConversionResult {
  result: string;
  rate: string;
  target: string;
  base: string;
  amount: number;
}

const ERROR_MESSAGE = 'Error occurred, try again or choose another input option'

const CurrencyExchangeComp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const popularCurrencies: CurrencyModel[] = useSelector<StateType, CurrencyModel[]>(state => state.popularCurrencies);
    const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null)

    const { reset, register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => convert(data)

    const convert = async (data: any) => {
        setIsLoading(true)
        let res = await dashboardService.convertCurrencies(data.base, data.target, data.amount)
        if(res){
          const { conversion_result, conversion_rate, target_code, base_code } = res;
          setConversionResult({result: conversion_result, rate: conversion_rate, 
            target: target_code, base: base_code, amount: data.amount})
          reset()
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

    const handleClose = () => {
      setConversionResult(null)
    }
    

  return (
    <>
      <ToastContainer />
        <Box display="flex" justifyContent="center" paddingX={10}>
         <Stack spacing={3} width={300}>
         <Box display="flex" justifyContent="center" >
          <Heading as='h4' size='md' >
            Currency Exchange
          </Heading>
        </Box>
        <>
        {
          !conversionResult 
          ? (
            <>
                      {
            isLoading 
            ? (
            <Box display="flex" justifyContent="center" paddingTop={10}>
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
              <Card>
              <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl  isInvalid={!!errors.target} marginY={4}>
                <FormLabel>Base</FormLabel >
                <Select placeholder='Select option'defaultValue="" {...register("base", { required: true })}>
                    {
                        popularCurrencies.map((e, i) => {
                            return <option value={e.currency} key={i}>{e.currency}</option>
                        })
                    }
                </Select>
              </FormControl>
              <FormControl isInvalid={!!errors.target} marginY={4}>
                <FormLabel>Target</FormLabel>
                <Select placeholder='Select option'defaultValue="" {...register("target", { required: true })}>
                    {
                        popularCurrencies.map((e, i) => {
                            return <option value={e.currency} key={i}>{e.currency}</option>
                        })
                    }
                </Select>
              </FormControl>
              <FormControl isInvalid={!!errors.amount} marginY={4}>
                <FormLabel>Amount</FormLabel>
                <Input type='number' defaultValue={1} {...register("amount", { required: true, min: 1 })}/>
              </FormControl>
            <WrapItem paddingX={10} marginY={2}>
              <Button colorScheme='blue' type='submit' style={{width: '100%'}} >Calculate</Button>
            </WrapItem>

            </form>
            </CardBody>
            </Card>

            )
          }
            </>
          ) 
          : (<CurrencyExchangeResultComp close={handleClose} conversionResult={conversionResult}/>)
        }
        </>
        </Stack>
      </Box>
    </>
  )
}

export default CurrencyExchangeComp
