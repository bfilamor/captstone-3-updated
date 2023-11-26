import { useContext, useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import moment from 'moment';
import { AppointmentDetailsAdmin } from './AppointDetailsAdmin';

export const AppointmentsDataGrid = ({ appointmentsData, fetchAppointments, filteredStatus }) => {

    const AppointmentDetails = (params) => (
        <AppointmentDetailsAdmin appointment={params.value} fetchAppointments={fetchAppointments} />
    )


    const AppointmentStatus = (params) => (
        <div className={params.value === "cancelled" ? "text-danger" : params.value === "pending" ? "text-warning" : "text-success"} >{params.value}</div>
    )

    const columns = [
        { field: 'id', headerName: 'Appointment ID', flex: 1, headerClassName: 'order-data-grid-header' },
        {
            field: 'bookingDate',
            headerName: 'Booking Date',
            flex: 1,
            headerClassName: 'order-data-grid-header'
        },
        {
            field: 'appointmentDate',
            headerName: 'Appointment Date',
            flex: 1,
            headerClassName: 'order-data-grid-header'
        },
      
        {
            field: 'timeSlot',
            headerName: 'Time Slot',
            flex: 1,
            headerClassName: 'order-data-grid-header'
        },
        {
            field: 'name',
            headerName: 'Patient Name',
            flex: 1,
            headerClassName: 'order-data-grid-header'
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.5,
            headerClassName: 'order-data-grid-header',
            renderCell: AppointmentStatus
        },
        {
            headerName: '',
            field: 'viewDetails',
            flex: 1,
            headerClassName: 'order-data-grid-header',
            renderCell: AppointmentDetails
        },

    ];

    const filteredAppointments = [];
    appointmentsData.forEach((appointment) => {
        if (appointment.status === filteredStatus || filteredStatus === "none") {
            filteredAppointments.push(appointment)
        }
    });

    const rows = filteredAppointments.map((appointment) => {
        return {
            id: appointment._id,
            bookingDate: moment(appointment.bookingDate).format("MMM D, YYYY"),
            appointmentDate: moment(appointment.appointmentDate).format("MMM D, YYYY"),
            timeSlot: appointment.timeSlot,
            name: appointment.patientName,
            status: appointment.status,
            viewDetails: appointment
        }

    });

    const ODD_OPACITY = 0.2;

    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
        [`& .${gridClasses.row}.even`]: {
            backgroundColor: theme.palette.grey[200],
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
            '&.Mui-selected': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity,
                ),
                '&:hover, &.Mui-hovered': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY +
                        theme.palette.action.selectedOpacity +
                        theme.palette.action.hoverOpacity,
                    ),
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            ODD_OPACITY + theme.palette.action.selectedOpacity,
                        ),
                    },
                },
            },
        },
    }));

    return (
        <>
            <StripedDataGrid
                localeText={{ noRowsLabel: "No Appointments" }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                disableRowSelectionOnClick
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
            />
        </>
    )
}
