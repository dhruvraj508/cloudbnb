import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import Layout from './Layout'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import ListingPage from './pages/ListingPage'
import BookingsPage from './pages/BookingsPage'
import SingleBookingPage from './pages/SingleBookingPage'

axios.defaults.baseURL = 'https://cloudbnb-api.vercel.app/'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/account' element={<ProfilePage/>} />
        <Route path='/account/listings' element={<PlacesPage/>} />
        <Route path='/account/listings/new' element={<PlacesFormPage/>} />
        <Route path='/account/listings/:id' element={<PlacesFormPage/>} />
        <Route path='/rooms/:id' element={<ListingPage/>}/>
        <Route path='/account/bookings' element={<BookingsPage/>} />
        <Route path='/account/bookings/:id' element={<SingleBookingPage/>} />
      </Route>  
    </Routes>
    </UserContextProvider>
  )
}

export default App
