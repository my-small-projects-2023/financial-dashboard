import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Select, Spinner, Stack, WrapItem } from '@chakra-ui/react';
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import CurrencyModel from '../../models/CurrencyModel';
import { useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { dashboardService } from '../../config/service-config';

type Inputs = {
    base: string,
    target: string,
    amount: number
}

const ERROR_MESSAGE = 'Error occurred, try again or choose another input option'

const CurrencyExchangeComp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const popularCurrencies: CurrencyModel[] = useSelector<StateType, CurrencyModel[]>(state => state.popularCurrencies);
    const [result, setResult] = useState("");

    const { reset, register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => convert(data)

    const convert = async (data: any) => {
        setIsLoading(true)
        let res = await dashboardService.convertCurrencies(data.base, data.target, data.amount)
        if(res){
            setResult(res)
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
        console.log('RESULT',res)
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
            )
          }
        </Stack>
      </Box>
    </>
  )
}

export default CurrencyExchangeComp
