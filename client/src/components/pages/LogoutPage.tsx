import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { authAction } from '../../redux/actions';
import { emptyClientData } from '../../models/ClientData';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../config/service-config';
import { LOGIN_PATH } from '../../config/route-config';

const LogoutPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    logout()
  }, [])

  const logout = async () => {
    await authService.logout();
    dispatch(authAction(emptyClientData));
    navigate(LOGIN_PATH);
  }

  return (
    <></>
  )
}

export default LogoutPage
