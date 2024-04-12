import { useState } from 'react'
import './App.css';
import Navigator from './components/navogator/Navigator';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from './config/route-config';
import { Spinner, Box } from '@chakra-ui/react';


const App = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <Navigator/>
      {
        isLoading 
        ? (<Box display="flex" justifyContent="center" paddingTop={5}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Box>) 
        : (<Routes>
            {ROUTES.map((e) => <Route key={e.path} path={e.path} element={e.element} />)}
          </Routes>) 
      }
       
      
    </BrowserRouter>
  )
}

export default App

