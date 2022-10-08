// @ts-ignore
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './Home'
import {ROUTES} from "../routes";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.index} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
