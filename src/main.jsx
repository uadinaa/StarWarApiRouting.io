import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import CreatingCard from './pages/CreatingCard.jsx'
import CardList from './pages/CharactersList.jsx'
import CharacterDetails from './pages/CharacterDetails.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {path: '/', element: <Home />},
            {path: '/products', element: <CardList />},
            {path: '/products/:id', element: <CharacterDetails />},
            {path: '/create-product', element: <CreatingCard />}
        ],
    },
    {path: '*', element: <NotFoundPage/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


