import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchAuth } from '../redux/actions/auth/action-auth'
import { HOME_PAGE } from '../routes'

export const RequireAuth = ({children}:any) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth.auth)
  const loaded = useAppSelector(state => state.auth.loading)

  useEffect(() => {
    dispatch(fetchAuth())
  }, [])

  if (loaded) {
    return <></>
  }
  
  if (!auth) {
    return <Navigate to={`${HOME_PAGE}`} />
  }

  return (
    <>
      {children}
    </>
  )
}
