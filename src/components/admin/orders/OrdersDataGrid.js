import { useContext, useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import moment from 'moment';
import { OrderDetailsAdmin } from './OrderDetailsAdmin';
import { motion } from "framer-motion"

export const OrdersDataGrid = ({ordersData, fetchOrders}) => {

    const OrderDetails = (params) => (
        <OrderDetailsAdmin orderId={params.value} fetchOrders={fetchOrders} />
    )

    const TotalAmount = (params) => (
        <div>₱{params.value}</div>
    )

    const OrderStatus = (params) => (
        <div className={params.value === "cancelled" ? "text-danger" : "text-success"} >{params.value}</div>
    )

    const columns = [
        { field: 'id', headerName: 'Order ID', flex: 1,  headerClassName:'order-data-grid-header' },
        {
            field: 'orderDate',
            headerName: 'Order Date',
            flex: 1,
            headerClassName:'order-data-grid-header'
        },
        {
            field: 'email',
            headerName: 'Customer Email',
            flex: 1,
            headerClassName:'order-data-grid-header'
        },
        {
            field: 'name',
            headerName: 'Customer Name',
            flex: 1,
            headerClassName:'order-data-grid-header'
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.5,
            headerClassName:'order-data-grid-header',
            renderCell: OrderStatus
        },
        {
            field: 'total',
            headerName: 'Total Amount',
            type: 'number',
            flex: 0.7,
            headerClassName:'order-data-grid-header',
            renderCell: TotalAmount
        },
        {
            headerName: '',
            field: 'viewDetails',
            flex: 1,
            headerClassName:'order-data-grid-header',
            renderCell: OrderDetails
        },

    ];

    const rows = ordersData.map((order) => {
        return {
            id: order._id,
            orderDate: moment(order.purchasedOn).format("MMM D, YYYY"),
            email: order.customerEmail,
            name: order.customerName,
            status: order.status,
            total: order.totalAmount,
            viewDetails: order._id
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
