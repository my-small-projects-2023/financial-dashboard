import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Heading, Input, Spinner, Stack, WrapItem } from '@chakra-ui/react'


type Inputs = {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

const LoginPage = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => isLogin ? handleLogin(data) : handleSignUp(data)

  const handleLogin = (data: any) => {
    console.log(data)
  }

  const handleSignUp = (data: any) => {
    console.log(data)
  }
 
  
    return (
      <Box display="flex" justifyContent="center" >
         <Stack spacing={3} width={300}>
         <Box display="flex" justifyContent="center" >
          <Heading as='h2' size='xl'>
            {
              isLogin ? "Login" : "Signup"
            }
          </Heading>
        </Box>
          {
            isLoading 
            ? (
            <Box display="flex" justifyContent="center" >
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
              {
                !isLogin &&
                <>
                <FormControl isInvalid={!!errors.firstName} marginY={4}>
                <FormLabel>First Name</FormLabel>
                <Input type='text' defaultValue="" {...register("firstName", { required: true, minLength: 2 })}/>
                  {
                    !!errors.firstName
                    ? <FormErrorMessage>First Name is required.</FormErrorMessage>
                    : <FormHelperText>Please enter your first name.</FormHelperText>
                  }
              </FormControl>
                <FormControl isInvalid={!!errors.lastName} marginY={4}>
                <FormLabel>Last Name</FormLabel>
                <Input type='text' defaultValue="" {...register("lastName", { required: true, minLength: 2 })}/>
                  {
                    !!errors.lastName
                    ? <FormErrorMessage>Last Name required.</FormErrorMessage>
                    : <FormHelperText>Please enter your last name.</FormHelperText>
                  }
              </FormControl>
                </>
              }
              <FormControl isInvalid={!!errors.email} marginY={4}>
                <FormLabel>Email address</FormLabel>
                <Input type='email' defaultValue="" {...register("email", { required: true })}/>
                  {
                    !!errors.email
                    ? <FormErrorMessage>Email is required.</FormErrorMessage>
                    : <FormHelperText>Please enter your email.</FormHelperText>
                  }
              </FormControl>
              <FormControl isInvalid={!!errors.password} marginY={4}>
                <FormLabel>Password</FormLabel>
                <Input type='password' defaultValue="" {...register("password", { required: true, minLength: 8 })}/>
                {
                  !!errors.password 
                  ? <FormErrorMessage>Password is required.</FormErrorMessage>
                  : <FormHelperText>Please enter your password.</FormHelperText>
                }
              </FormControl>
            {/* <button type='submit'>Submit</button> */}
            <WrapItem paddingX={5} marginY={4}>
              <Button colorScheme='blue' type='submit' style={{width: '100%'}} >{isLogin ? "Login" : "Signup"}</Button>
            </WrapItem>
            <WrapItem paddingX={5} marginY={4}>
              <Button onClick={() => setIsLogin(!isLogin)} colorScheme='teal' style={{width: '100%'}}>{isLogin ? "Other options" : "Go back"}</Button>
            </WrapItem>
            </form>
            )
          }
        </Stack>
      </Box>
    )
  }

  export default LoginPage;




