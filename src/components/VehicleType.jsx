import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import AxiosService from '../common/apiService';

function VehicleType({
  setIsWheelType,
  setIsVehicleType,
  setIsModelType,
  setVehicleTypeId,
  setBooking,
  wheelTypeId,
  booking
}) {
  const [vehicles, setVehicles] = useState([])
  const [isSelect, setIsSelect] = useState(false)

  const handleGetVehicles = async () => {
 
    try {
      let res = await AxiosService.get(`/vehicle/vehicleType/${wheelTypeId}`)
      setVehicles(res.data.vehicles)
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message ? error.response.data.message : error.response.data.message[0])
    }
  }

useEffect(() => {
  handleGetVehicles()  
}, [wheelTypeId])

  return <div>
        <h3>Select the vehicle type</h3>
    <Form>
      {
        vehicles?.length > 0 ?
        vehicles?.map((vehicle) => {
            return <div key={vehicle.id}>

       
                          <Form.Check

                  type="radio"
                  label={vehicle?.vehicleName}
                  value={vehicle?.id}  
                onChange={(e) => {
                  setIsSelect(true)
                  setBooking({ ...booking, vehicleTypeId: Number(e.target.value) })
                  setVehicleTypeId(Number(e.target.value))
                  }}  
                  checked={booking.vehicleTypeId === vehicle.id}  
          />
      </div>
          }) : <></>
      }

      <Button
        onClick={() => {
          setIsWheelType(true);
          setIsVehicleType(false)
        }}
        className="marginRight"
      >
        Prev
      </Button>
        
      <Button
        disabled={ (booking?.vehicleTypeId === undefined)}
        variant={booking?.vehicleTypeId === undefined? "secondary" : "primary"}
        onClick={() => {
          setIsVehicleType(false);
          setIsModelType(true);

        }}

      >
        Next
      </Button>
    </Form>
  </div>
}

export default VehicleType