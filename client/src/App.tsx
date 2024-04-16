import { useEffect, useState } from 'react'
import './App.css';
import Navigator from './components/navogator/Navigator';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from './config/route-config';
import { Spinner, Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import ClientData from './models/ClientData';
import { StateType } from './redux/store';
import { ToastContainer, toast } from 'react-toastify';
import ProfileData from './models/ProfileData';
import { profileService } from './config/service-config';
import { updateProfile } from './redux/actions';

const ERROR_MESSAGE = 'Error occurred'

const App = () => {

  const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if(clientData.id){
      getProfile()
    }
  }, [clientData])

  const getProfile = async() => {
    const profile: ProfileData | null = await profileService.getProfile();
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
  }

  return (
    <BrowserRouter>
        <ToastContainer />
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

