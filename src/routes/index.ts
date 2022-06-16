import { HalvesSection } from '../components/HalvesSection/HalvesSection';
import { HomePage } from './../pages/HomePage';

export const HOME_PAGE = '/'
export const AUTH_PAGE = '/halves'
export const REGISTER_ROUTE = '/register'

export const PUBLIC_ROUTE = [
  {
    path:HOME_PAGE,
    Element:HomePage
  },
  {
    path:REGISTER_ROUTE,
    Element:HomePage
  }
]

export const AUTH_ROUTE = [
  {
    path:AUTH_PAGE,
    Element:HalvesSection
  }
]