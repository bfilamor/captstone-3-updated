import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Chip from '@mui/material/Chip';
import { Button, Container, Row } from 'react-bootstrap';

export const BookingStep = ({ bookingProps }) => {


  const [schedule, setSchedule] = useState([]);

  const [bookedDates, setBookedDates] = useState([]);
  const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);

  const {setSelectedDate, selectedDate,  selectedTimeSlot,  setSelectedTimeSlot, setDoctorName } = bookingProps;

  const getDoctorSchedule = async () => {
    try {

      const res = await fetch(`${process.env.REACT_APP_API_URL}/doctors/getSchedule/6553b0e3b7bbf058fa7ca50b`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const doctorData = await res.json();
      if (doctorData) {

        setDoctorName(`${doctorData.firstName} ${doctorData.lastName}`);
        const scheduleArr = [];
        const daysArr = [];
        const bookedDatesArr = []
        //const thirtyDaysArray = nextThirtyDays();

        doctorData.bookedDates.forEach((bookedDate) => {
          bookedDatesArr.push(bookedDate);
          if (moment(bookedDate.date).format("MMM DD, YYYY") === moment(new Date()).format("MMM DD, YYYY")) {
            //set default timeSlots to today's current date schedule
            setBookedTimeSlots(bookedDate.timeSlots)
          }
        })

        doctorData.schedule.forEach((schedule) => {
          if (schedule.timeSlots.length > 0) {
            daysArr.push(schedule.day);
            scheduleArr.push(schedule);
          }
          if (schedule.day === moment(new Date()).isoWeekday()) {
            //set default timeSlots to today's current date schedule
            setTimeSlots(schedule.timeSlots);
          }
        });
        setAvailableDays(daysArr);
        setBookedDates(bookedDatesArr);
        setSchedule(scheduleArr);
        //setSchedule(dayArr);
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const disabledDates = (date) => {
    return !availableDays?.includes(moment(date).isoWeekday());
  }

  const handleDayChange = (day) => {
    setSelectedDate(day);
    setSelectedTimeSlot('');
    let timeSlotsArr = [];
    let bookedTimeSlotsArr = [];
    schedule?.forEach((schedule) => {
      if (moment(day).isoWeekday() == schedule?.day) {
        timeSlotsArr = [...schedule?.timeSlots];
      }
    })

    bookedDates.forEach((bookedDate) => {
      if (moment(day).format('MMM DD YYYY') === moment(bookedDate.date).format('MMM DD YYYY')) {
        bookedTimeSlotsArr = [...bookedDate.timeSlots];
      }
    })

    setBookedTimeSlots(bookedTimeSlotsArr);
    setTimeSlots(timeSlotsArr);

  }

  useEffect(() => {
    getDoctorSchedule();
  },[])

  return (
    <>
      <DateCalendar
        disablePast
        shouldDisableDate={disabledDates}
        maxDate={moment(new Date()).add(30, 'days')}
        onChange={(day) => handleDayChange(day)}

      />
      {
        (timeSlots?.length == 0) ? <p>No Schedule for Today</p> :
          <div className='d-flex gap-1 justify-content-center flex-wrap py-3'>
            {
              timeSlots?.map((timeSlot) => (
                (bookedTimeSlots.findIndex((bookedTime) => JSON.stringify(bookedTime) === JSON.stringify(timeSlot)) >= 0) ?
                  <Chip
                    key={timeSlot}
                    label={timeSlot}
                    disabled={true}
                    color={selectedTimeSlot == timeSlot ? "primary" : "default"}
                    style={{fontSize:"15px"}}
                  />
                  :
                  <Chip
                    key={timeSlot}
                    label={timeSlot}
                    disabled={false}
                    color={selectedTimeSlot == timeSlot ? "primary" : "default"}
                    onClick={() => setSelectedTimeSlot(timeSlot)}
                    style={{fontSize:"15px"}}
                  />
              ))
            }
          </div>
      }


    </>
  )
}
