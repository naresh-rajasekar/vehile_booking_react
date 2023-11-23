import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import AxiosService from '../common/apiService';

function WheelType({
  setIsNameShow,
  setIsWheelType,
  setIsVehicleType,
  setBooking,
  booking,
  setWheelTypeId,
}) {
  const [wheels, setWheels] = useState([])
  const handleGetWheels = async () => {
 
    try {
      let res = await AxiosService.get(`/vehicle/wheels`)
      setWheels(res.data.wheels)
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message ? error.response.data.message : error.response.data.message[0])
    }
  }

useEffect(() => {
  handleGetWheels()  
},[])


  return <>
    <h3>Select the wheel type</h3>
    <Form>
      {
        wheels?.length > 0 ?
          wheels?.map((wheel) => {
            return <div key={wheel.id}>

       
                          <Form.Check

                  type="radio"
                  label={wheel?.wheelType}
                  value={wheel?.id}  
                onChange={(e) => {
                  setBooking({ ...booking, wheelTypeId: Number(e.target.value), vehicleTypeId: undefined, modelNameId : undefined })
                  setWheelTypeId(Number(e.target.value))
                  }}  
                  checked={booking.wheelTypeId === wheel.id}  
          />
      </div>
          }) : <></>
      }

      <Button
        onClick={() => {
          setIsNameShow(true)
          setIsWheelType(false)
      }}
      >
        Prev
      </Button>
        
      <Button
        disabled={booking?.wheelTypeId === undefined}
        variant={ booking?.wheelTypeId === undefined ? "secondary" : "primary"}
        onClick={() => {
          setIsWheelType(false)
          setIsVehicleType(true)
        }}

      >
        Next
      </Button>
    </Form>
  </>
}

export default WheelType