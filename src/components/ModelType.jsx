import React, { useState , useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import AxiosService from '../common/apiService';

function ModelType({
  setIsVehicleType,
  setIsModelType,
  setIsFinal,
  setBooking,
  vehicleTypeId,
  booking
}) {
  const [models, setModels] = useState([])

  const handleGetModels = async () => {
 
    try {
      let res = await AxiosService.get(`/vehicle/model/${vehicleTypeId}`)
      setModels(res.data.models)
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message ? error.response.data.message : error.response.data.message[0])
    }
  }
  useEffect(() => {
    handleGetModels()  
  }, [vehicleTypeId])

  return <>
          <h3>Select the Model type</h3>
    <Form>
      {
        models?.length > 0 ?
        models?.map((model) => {
            return <div key={model.id}>

       
                          <Form.Check

                  type="radio"
                  label={model?.modelName}
                  value={model?.id}  
                onChange={(e) => {
                  setBooking({ ...booking, modelNameId: Number(e.target.value) })
                  }}  
                  checked={booking.modelNameId === model.id}  
          />
      </div>
          }) : <></>
      }

      <Button
        onClick={() => {
          setIsVehicleType(true);
          setIsModelType(false);
      }}
      >
        Prev
      </Button>
        
      <Button
        disabled={ (booking?.modelNameId === undefined)}
        variant={(booking?.modelNameId === undefined) ? "secondary" : "primary"}
        onClick={() => {
          setIsModelType(false);
          setIsFinal(true);

        }}

      >
        Next
      </Button>
    </Form>

  </>
}

export default ModelType