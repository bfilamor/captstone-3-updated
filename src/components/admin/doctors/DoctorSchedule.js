import React, { useEffect, useMemo, useState } from 'react'
import { Button, Form, Table , Row, Col} from 'react-bootstrap';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import moment from 'moment';

export const DoctorSchedule = () => {

    const [day, setDay] = useState(0);
    const [selectedDay, setSelectedDay] = useState(1);
    const [startingHour, setStartingHour] = useState(null);
    const [endingHour, setEndingHour] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [isScheduleEdited, setIsScheduleEdited] = useState(false);

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
                const scheduleArr = [];
                doctorData.schedule.forEach((schedule) => {
                    scheduleArr.push(schedule);
                    //setTimeSlots(schedule.timeSlots);
                });
                scheduleArr.sort((a, b) => a.day - b.day);
                setSchedule(scheduleArr);
                //load monday timeSlots on page load because the default selected day is Monday
                if (selectedDay == 1) {
                    //if selected day is monday
                    doctorData.schedule.forEach((schedule) => {
                        if (schedule.day == 1) {
                            setTimeSlots(schedule.timeSlots);
                        }
                    });
                }
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const modifyDoctorSchedule = async () => {
        try {

            const res = await fetch(`${process.env.REACT_APP_API_URL}/doctors/modifySchedule/6553b0e3b7bbf058fa7ca50b`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    schedule: [
                        {
                            day: selectedDay,
                            timeSlots: timeSlots
                        }
                    ]
                })
            })

            const doctorData = await res.json();

            if (doctorData) {
                getDoctorSchedule();
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleHours = () => {
        const timeSlotsArr = [];
        timeSlotsArr.push(`${moment(startingHour).format("h:mm A")} - ${moment(endingHour).format("h:mm A")}`);

        setTimeSlots((prev) => {
            return [
                ...prev,
                ...timeSlotsArr
            ]
        });

        setStartingHour(null);
        setEndingHour(null);
        setIsScheduleEdited(true);
    }

    const handleDeleteHours = (chipToDelete) => {
        setTimeSlots((chips) => chips.filter((chip) => chip !== chipToDelete));
        setIsScheduleEdited(true);
    }

    const handleDayChange = () => {
        setIsScheduleEdited(false);
        setTimeSlots([]);
        setStartingHour(null);
        setEndingHour(null);

        schedule?.forEach((schedule) => {
            if (selectedDay == schedule?.day) {
                setTimeSlots(schedule?.timeSlots)
            }
        })
    }

    useEffect(() => {
        getDoctorSchedule();
    }, [])

    useMemo(() => {
        handleDayChange();
    }, [selectedDay])

    return (
        <>
            {
                (schedule?.length === 0) ? <p>No schedule found</p> :
                    <div className='row pt-5 pb-3'>
                        <Table responsive bordered hover>
                            <thead>
                                <tr>
                                    {
                                        schedule?.map((schedule) => (
                                            <th className='fw-bold' key={schedule._id}>{moment().days(schedule.day).format("dddd")}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        schedule?.map((schedule) => (
                                            <td key={schedule._id}>
                                                {(schedule?.timeSlots?.length > 0) ?
                                                    <ul>
                                                        {
                                                            schedule?.timeSlots.map((hour) => (
                                                                <li key={hour}>{hour}</li>
                                                            ))
                                                        }
                                                    </ul> :
                                                    "No Schedule for this day"
                                                }

                                            </td>
                                        ))
                                    }
                                </tr>
                            </tbody>
                        </Table>
                    </div>

            }

            <Row className='row align-items-center py-3'>
                <Col className='col-lg-3 mb-lg-0 mb-3 col-12 d-flex justify-content-center'>
                    <FormControl fullWidth>
                        <InputLabel id="select-day">Select Day</InputLabel>
                        <Select
                            labelId="select-day"
                            id="select-day-select"
                            value={selectedDay}
                            label="Select Day"
                            onChange={(e) => { setSelectedDay(e.target.value) }}
                        >
                            <MenuItem value={1}>Monday</MenuItem>
                            <MenuItem value={2}>Tuesday</MenuItem>
                            <MenuItem value={3}>Wednesday</MenuItem>
                            <MenuItem value={4}>Thursday</MenuItem>
                            <MenuItem value={5}>Friday</MenuItem>
                            <MenuItem value={6}>Saturday</MenuItem>
                            <MenuItem value={7}>Sunday</MenuItem>
                        </Select>
                    </FormControl>
                </Col>
                <Col className='col-lg-auto mb-lg-0 mb-3 col-12'>
                    <div className='row'>
                        <div className='col'>
                            <TimePicker label="Starting Hour"
                                value={startingHour}
                                onChange={(newValue) => setStartingHour(newValue)}
                            />
                        </div>
                        <div className='col'>
                            <TimePicker label="Ending Hour"
                                value={endingHour}
                                onChange={(newValue) => setEndingHour(newValue)}
                            />
                        </div>
                    </div>
                </Col>
                <Col className='col-lg-auto col-12 text-lg-start text-center'>
                    <Button disabled={startingHour && endingHour ? false : true}
                        onClick={() => { handleHours() }}
                    >Add Schedule</Button>

                </Col>
            </Row>

            <div className='p-3 border rounded-4  mb-4 mt-3'>
                {
                    (timeSlots?.length === 0) ? <p className='my-0'>No Schedule for this Day</p> :
                        <div className='d-flex gap-1 flex-wrap '>
                            {timeSlots?.map((hour) => (
                                <Chip
                                    key={hour}
                                    label={hour}
                                    onDelete={() => { handleDeleteHours(hour) }}
                                />
                            ))}
                        </div>
                }
            </div>

            <div className='text-lg-start text-center'>
                <Button disabled={isScheduleEdited ? false : true} onClick={() => { modifyDoctorSchedule() }}>Confirm Schedule for {moment().days(selectedDay).format("dddd")}</Button>
            </div>
        </>
    )
}
