import React, { useEffect, useMemo, useState } from 'react'
import { Container, Card, Table, Button, Row, Col } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import moment from 'moment';
import { OrderDetails } from '../components/users/OrderDetails';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AdminLoader } from '../components/admin/AdminLoader';
import { motion } from "framer-motion";
import { DatePicker } from '@mui/x-date-pickers';
import { groupBy } from "lodash"


export const Orders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredStartDate, setFilteredStartDate] = useState('');
  const [filteredEndDate, setFilteredEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [filteredPageNumber, setFilteredPageNumber] = useState(1);
  const [paginationPages, setPaginationPages] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();


  const checkIfLoggedin = () => {
    let token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data) {
          //if the token is not an admin, redirect to /courses page
          navigate("/products")
        }

        if (data.isAdmin === true) {
          navigate("/dashboard")
        }

      }).catch(error => console.log(error.message))
  }


  const getUserOrders = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const ordersData = await res.json();
      if (ordersData) {
        setIsFiltering(false);
        let items = [];
        if (ordersData.numberOfPages > 1) {
          for (let number = 1; number <= ordersData.numberOfPages; number++) {
            items.push(
              number
            );
          }

          setPaginationPages(items);
        } else {
          setPaginationPages([]);
        }
        setOrders(ordersData.data);
        setLoading(false);

        let grouped = groupBy(ordersData.data, function (item) {
          return item.purchasedOn.substring(0, 7);
        });

        setGroupedOrders(grouped);

      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const getUserFilteredOrders = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders?page=${filteredPageNumber}&startDate=${searchParams.get("startDate") ? searchParams.get("startDate") : startDate}&endDate=${searchParams.get("endDate") ? searchParams.get("endDate") : endDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const ordersData = await res.json();
      if (ordersData) {
        let items = [];
        if (ordersData.numberOfPages > 1) {
          for (let number = 1; number <= ordersData.numberOfPages; number++) {
            items.push(
              number
            );
          }

          setPaginationPages(items);
        } else {
          setPaginationPages([]);
        }
        setOrders(ordersData.data);
        setLoading(false);
        let grouped = groupBy(ordersData.data, function (item) {
          return item.purchasedOn.substring(0, 7);
        });

        setGroupedOrders(grouped);
        setFilterLoading(false);

      }

    } catch (error) {
      console.log(error.message)
    }
  }

  /*   const ordersRow = orders.map((order) => {
      return (
        <motion.tr initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={order._id} style={{ verticalAlign: "middle" }}>
          <td> {order._id}</td>
          <td> {moment(order.purchasedOn).format("MMM D, YYYY")}</td>
          <td className={order.status === "cancelled" ? "text-danger" : "text-success"}>{order.status}</td>
          <td>₱{order.totalAmount}</td>
          <td className='text-center'>
            <OrderDetails productId={order._id} />
          </td>
        </motion.tr>
      )
    }) */


  const handleDateFilter = () => {
    //setPage(1);
    setFilterLoading(true);
    setIsFiltering(true);
    setFilteredPageNumber(1);
    setSearchParams({ startDate: startDate, endDate: endDate });

  }

  const handlePaginationChange = (event, value) => {
    if (!isFiltering) {
      setPage(value);
    } else {
      setFilteredPageNumber(value);
    }
  };

  useEffect(() => {
   
    getUserOrders();
    checkIfLoggedin();
  }, [])

  useMemo(() => {
    getUserOrders();
  }, [page])

  useMemo(() => {
    getUserFilteredOrders();
  }, [filteredPageNumber, searchParams])

  useMemo(() => {
    setSearchParams({});
  },[])
  
  return (
    <>
      <Container className='py-5'>
        <h2 className='text-center mb-3'>My Transaction History</h2>
        {(loading) ? <AdminLoader /> :
          <>
            <Row>
              <Col className='col-lg-3 col-12 pt-3 pe-lg-5 mb-lg-0 pb-3'>
                <div className="position-sticky" style={{ top: "20%" }}>
                  <p className='mt-0 mb-2'><strong>Start Date</strong></p>
                  <DatePicker value={startDate} className='w-100 mb-3' onChange={(newValue) => setStartDate(newValue)} />

                  <p className='mt-0 mb-2'><strong>End Date</strong></p>
                  <DatePicker value={endDate} className='w-100 mb-3' onChange={(newValue) => setEndDate(newValue)} />

                  <div className='text-lg-start text-center'>
                    <Button disabled={startDate && endDate ? false : true} onClick={() => { handleDateFilter() }}>Filter Dates</Button>

                  </div>

                </div>

              </Col>
              <Col className='col-lg-9 col-12'>

                {(orders?.length === 0) ? <p className='text-center py-5'>No Transactions Found</p> :
                  (filterLoading) ? <AdminLoader /> :
                    <>
                      {
                        Object.keys(groupedOrders).map((item) => {
                          return (
                            <div key={item}>
                              <h3 className='fw-bold pt-3 mb-3'>{moment(item).format("MMM YYYY")}</h3>
                              <Timeline className='p-0' sx={{
                                [`& .${timelineItemClasses.root}:before`]: {
                                  flex: 0,
                                  padding: 0,
                                },
                              }}>
                                {
                                  groupedOrders[item].map((order) => {
                                    return (
                                      <motion.div key={order._id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                                        <TimelineItem >
                                          <TimelineSeparator>
                                            <TimelineDot className={order.status === "cancelled" ? "bg-danger" : "bg-success"} />
                                            <TimelineConnector />
                                          </TimelineSeparator>
                                          <TimelineContent>
                                            <div className='bg-light border overflow-hidden my-2 d-block p-3' style={{ borderRadius: "15px" }} >
                                              <div className='row'>
                                                <div className='col-5'>
                                                  <p className='fw-bold mb-0'>Order ID</p>
                                                  <h4 className='fw-bold text-break'>{order._id}</h4>
                                                  <p className='text-secondary'>{moment(order.purchasedOn).format("MMM D, YYYY")}</p>
                                                </div>
                                                <div className='col-7 flex-column d-flex justify-content-end align-items-end'>
                                                  <h4 className='fw-bold mb-0'>₱{order.totalAmount}</h4>
                                                  <p className={order.status === "cancelled" ? "text-danger text-capitalize" : "text-success text-capitalize"}>{order.status}</p>

                                                  <OrderDetails productId={order._id} />
                                                </div>
                                              </div>


                                            </div>
                                          </TimelineContent>
                                        </TimelineItem>
                                      </motion.div>

                                    )
                                  })
                                }


                              </Timeline>
                            </div>

                          )
                        })
                      }

                      {(paginationPages?.length > 0) ?
                        <>
                          <div className='py-5 d-flex justify-content-center'>
                            <Pagination className='custom-pagination' showLastButton={paginationPages.length > 4 ? true : false} showFirstButton={paginationPages.length > 4 ? true : false} size='large' count={paginationPages.length} page={!isFiltering ? page : filteredPageNumber} onChange={handlePaginationChange} />

                          </div>

                        </>
                        : null
                      }

                    </>

                }
              </Col>
            </Row>
          </>
        }


      </Container>
    </>
  )
}
