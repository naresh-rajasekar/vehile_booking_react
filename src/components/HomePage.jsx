import React, { useState} from 'react'
import { toast } from 'react-toastify';
import AxiosService from '../common/apiService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import WheelType from './WheelType';
import ModelType from './ModelType';
import VehicleType from './VehicleType';
import FinalPage from './FinalPage';

function HomePage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [user, setUser] = useState({})
  const [isNameShow, setIsNameShow] = useState(true);
  const [isWheelType, setIsWheelType] = useState(false);
  const [isVehicleType, setIsVehicleType] = useState(false);
  const [isModelType, setIsModelType] = useState(false);
  const [isfinal, setIsFinal] = useState(false);
  const [booking, setBooking] = useState({});
  const [wheelTypeId, setWheelTypeId] = useState()
  const [vehicleTypeId, setVehicleTypeId] = useState()
  const [modelNameId, setmodelNameId] = useState()
  const handleAddUser = async (e) => {
    try {
      e.preventDefault();
      let data = {
        firstName: firstName,
        lastName: lastName
      }
      console.log(data);
      let res = await AxiosService.post('/booking/addUser', data)

      if (res.data.statusCode === 200) { 
        setUser(res.data.user[0])
        setBooking({userId : res.data.user[0].id, startDate : "", endDate : ""})
        setIsNameShow(false);
        setIsWheelType(true);
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message ? error.response.data.message : error.response.data.message[0]
         )
    }
  }
  return    <div className="container d-flex justify-content-center marginTop">
  
    {
      isNameShow ?  
      <div>  
          <h3>What is your name?</h3>
          
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your firstname" 
            value={firstName} 
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
            />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your lastname" 
            value={lastName} 
            onChange={(e) => {
              setLastName(e.target.value);
            }}
                required
                className="mb-3"
            />
        </Form.Group>
        
        <Button variant={((firstName === "") || (lastName === "") || (booking?.firstName )|| (booking?.lastName)) ? "secondary" : "primary"} type="submit"
          disabled= {firstName === "" || lastName === "" || booking?.firstName || booking?.lastName}
          onClick={(e) => {
          handleAddUser(e)
              }}
              className="mb-3">
        Next
      </Button>
    </Form>
  
     </div> : 
        isWheelType ? 
          <WheelType 
            setIsNameShow={setIsNameShow}
            setIsWheelType={setIsWheelType}
            setIsVehicleType={setIsVehicleType}
            setBooking={setBooking}
            booking={booking}
            setWheelTypeId={setWheelTypeId}
            wheelTypeId={wheelTypeId}
          /> : 
          isVehicleType ? 
            <VehicleType 
              setIsWheelType={setIsWheelType}
              setIsVehicleType={setIsVehicleType}
              setBooking={setBooking}
              setIsModelType={setIsModelType}
              setVehicleTypeId={setVehicleTypeId}
              wheelTypeId={wheelTypeId}
              booking={booking}
            /> : 
            isModelType ? 
              <ModelType 
               
                setIsVehicleType={setIsVehicleType}
                setIsModelType={setIsModelType}
                setIsFinal={setIsFinal}
                setBooking={setBooking} 
                booking={booking}
                vehicleTypeId={vehicleTypeId}
              /> : 
              isfinal ? 
                <FinalPage
                setIsFinal={setIsFinal}
                setBooking={setBooking}
                setIsModelType={setIsModelType}
                  setIsNameShow={setIsNameShow}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                booking={booking} 
                /> : <></>
         }

    </div>
}

export default HomePage