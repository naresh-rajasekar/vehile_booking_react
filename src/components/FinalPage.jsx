import React, {useState} from 'react'
import { toast } from 'react-toastify';
import AxiosService from '../common/apiService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FinalPage({
  setIsFinal,
  setIsNameShow,
  setIsModelType,
  setBooking,
  booking,
  setFirstName,
  setLastName
}) {
  const [startDate, setStartDate] = useState("")
  const [lastDate, setLastDate] = useState("")
  const handleBookingSubmit = async (e) => {
    try {
      e.preventDefault();
      let res = await AxiosService.post('/booking/addBooking', booking)
      if (res.data.statusCode === 200) { 
        console.log(res.data.message)
        toast.success(res.data.message);
        setIsNameShow(true);
        setIsFinal(false);
        setFirstName("");
        setLastName("");
        setBooking({})

      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message ? error.response.data.message : error.response.data.message[0]
         )
      
    }
  }
  return <>
        <h3>Select the date</h3>
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select the start date" 
            value={booking?.startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setBooking({...booking, startDate: e.target.value});
            }}
            required
            />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Last Start</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select the start date" 
            value={booking?.endDate} 
            onChange={(e) => {
              setLastDate(e.target.value);
              setBooking({...booking, endDate: e.target.value});
            }}
            required
            />
        </Form.Group>
        <Button
        onClick={() => {
          setIsModelType(true);
          setIsFinal(false);
      }}
      >
        Prev
      </Button>
      <Button
        variant={((booking?.startDate === "") || (booking?.endDate === "")) ? "secondary" : "primary"} type="submit"
          disabled= {booking?.startDate === "" || booking?.endDate === ""}
          onClick={(e) => {
            handleBookingSubmit(e)
      }}>
        Submit
      </Button>
    </Form>

  </>
}

export default FinalPage