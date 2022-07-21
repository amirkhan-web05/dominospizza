import { SnackPages } from './../pages/SnackPages/SnackPages';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { HalvesSection } from '../components/HalvesSection/HalvesSection';
import { HomePage } from '../pages/HomePage/HomePage';
import { PaymentPage } from '../pages/PaymenPage/PaymentPage';

export const HOME_PAGE = '/'
export const AUTH_PAGE = '/halves'
export const REGISTER_ROUTE = '/register'
export const NOT_FOUND_ROUTE = '*'
export const PAYMENT_ROUTE = '/payment'
export const SNACK_PAGE = '/snacks'

export const PUBLIC_ROUTE = [
  {
    path:HOME_PAGE,
    Element:HomePage
  },
  {
    path:REGISTER_ROUTE,
    Element:HomePage
  },
  {
    path:NOT_FOUND_ROUTE,
    Element:NotFoundPage
  },
  {
    path:PAYMENT_ROUTE,
    Element:PaymentPage
  },
  {
    path:SNACK_PAGE,
    Element:SnackPages
  }
]

export const AUTH_ROUTE = [
  {
    path:AUTH_PAGE,
    Element:HalvesSection
  }
]