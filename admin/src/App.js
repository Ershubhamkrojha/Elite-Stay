import React from 'react'
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/pages/home/Home'
import Login from '../src/pages/login/Login'
import List from '../src/pages/list/List'
// import Single from './pages/single/Single'
import SingleHotel from './pages/hotelDetails/SingleHotel'
import SingleRoom from './pages/roomDetails/SingleRoom'
import SingleUser from './pages/userDetails/SingleUser'
import New from './pages/new/New'
import NewHotel from './pages/newHotel/NewHotel'
import NewRoom from './pages/newRoom/NewRoom'
import { userInputs, hotelInputs } from './formSource'
import "./style/dark.scss"
import { useState } from 'react'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'
import { AuthContext } from './context/AuthContext'
import { userColumns, hotelColumns, roomColumns } from './DataSource'
function App() {
  const { darkMode } = useContext(DarkModeContext)
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* <Home /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login />} />
            <Route index element={
              <ProtectedRoute >
                <Home />
              </ProtectedRoute>} />
            <Route path='user'>
              <Route index element={
                <ProtectedRoute >
                  <List columns={userColumns} />
                </ProtectedRoute>
              } />
              <Route path=':userId' element={
                <ProtectedRoute >
                  <SingleUser/>
                  {/* <Single columns={userColumns} dataType="user"/> */}
                </ProtectedRoute>
              } />
              <Route path='new'
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>

                } />
            </Route>
            <Route path='hotels'>
              <Route index element={
                <ProtectedRoute>
                  <List columns={hotelColumns} />
                </ProtectedRoute>

              } />


              <Route path=':hotelId' element={
                <ProtectedRoute>
                  <SingleHotel/>
                  {/* <Single columns={hotelColumns} dataType="hotels"/> */}
                </ProtectedRoute>

              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='rooms'>
              <Route index element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>

              } />


              <Route path=':roomId' element={
                <ProtectedRoute>
                  <SingleRoom/>
                  {/* <Single columns={roomColumns} dataType="room"/> */}
                </ProtectedRoute>

              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewRoom/>
                </ProtectedRoute>
              } />
            </Route>


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
