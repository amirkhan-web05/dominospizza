import { Route, Routes } from "react-router-dom"
import { RequireAuth } from "../hoc/RequireAuth"
import { AUTH_ROUTE, PUBLIC_ROUTE } from "../routes"
import { Header } from "./Header/Header"

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export const AppRouter = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Routes>
      <Route path="/" element={<Header/>}>
        {PUBLIC_ROUTE.map(({path, Element}) => (
          <Route key={`${path}_${Element}`} path={path} element={<Element/>}/>
        ))}
        {AUTH_ROUTE.map(({path, Element}) => (
          <Route key={`${path}_${Element}`} path={path} element={
            // <Elements stripe={stripePromise} options={options}>
              <RequireAuth>
                <Element/>
              </RequireAuth>
            /* </Elements> */
          }/>    
        ))}
      </Route>
    </Routes>
  )
}