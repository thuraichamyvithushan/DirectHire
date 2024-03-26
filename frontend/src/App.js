
import './assets/css/style.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'

import { ToastContainer } from 'react-toastify';

import { Routes, Route } from "react-router-dom"

import Body from "./Body"



import LabourForm  from './components/workers/labourform'
import WorkForm from './components/Jobs/workform'


import Display from './components/workers/display'
import Workdisplay from './components/Jobs/Workdisplay'




import Admin from './admin/Home'
import Workdisplayy from './admin/Workdetails'
import Labouradmin from './admin/labourdetails'
import UserList from './admin/authdetails'
import PaymentDetails from './admin/PaymentDetails';
import WorkerForm from './admin/workerForm'
import JobForm from './admin/jobForm'


import Payment from './components/Payment/payment'



import Registration from './components/Authentication/register'
import Login from './components/Authentication/login';





function App() {
  return (
    <div className="App" theme="dark">

  <ToastContainer/>

   
   
      <Routes>
      
        <Route path="/" element={ <Body/> } />
        <Route path="/admin" element={ <Admin/> } />
        <Route path="display" element={ <Display/> } />
        <Route path="Workdisplay" element={ <Workdisplay/> } />
        <Route path="FormDataForm" element={ <LabourForm /> } />
        <Route path="WorkForm" element={ <WorkForm/> } />
       
      

        <Route path="/admin/job" element={ <Workdisplayy/> } />
        <Route path="/admin/worker" element={ <Labouradmin/> } />
        <Route path="/admin/userlist" element={ <UserList/> } />
        <Route path="/admin/payment" element={ <PaymentDetails/> } />
        <Route path="/admin/display/form" element={ <WorkerForm/> } />
        <Route path="/admin/workdisplay/form" element={ <JobForm/> } />


        <Route path="/pay" element={ <Payment/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="register" element={ <Registration/> } />

     
        
      </Routes>
   
    

      
    </div>
  )
}

export default App;

