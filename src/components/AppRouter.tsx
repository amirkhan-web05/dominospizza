import { Route, Routes } from "react-router-dom"
import { RequireAuth } from "../hoc/RequireAuth"
import { AUTH_ROUTE, PUBLIC_ROUTE } from "../routes"
import { Header } from "./Header/Header"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Header/>}>
        {PUBLIC_ROUTE.map(({path, Element}) => (
          <Route key={`${path}_${Element}`} path={path} element={<Element/>}/>
        ))}
        {AUTH_ROUTE.map(({path, Element}) => (
          <Route key={`${path}_${Element}`} path={path} element={
            <RequireAuth>
              <Element/>
            </RequireAuth>
          }/>    
        ))}
      </Route>
    </Routes>
  )
}