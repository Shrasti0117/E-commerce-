import React from 'react'
import './admin.css'
import Sidebar from '../../sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Addproduct from '../../Addproduct/Addproduct'
import Listproduct from '../../ListProduct/Listproduct'

const Admin = () => {
  return (
    <div className='Admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/listproduct' element={<Listproduct/>}/>
      </Routes>
    </div>
  )
}

export default Admin
