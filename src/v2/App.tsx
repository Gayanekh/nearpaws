import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NpHome } from './NpHome'
import { NpLayout } from './NpLayout'

/** Routes of the redesign. They grow until the redesign covers the whole site. */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/v2" element={<NpLayout />}>
          <Route index element={<NpHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
