import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
// import Paper from '@mui/material/Paper';
import { format } from 'timeago.js';
import { userRequest } from '../../utils/makeRequest';


const List = ({ data }) => {
    const [orders, setOrders] = useState([]);

    // handle status
    const handleStatus = async (id, status) => {
        try {
            const res = await userRequest.put(`/orders/${id}`, {
                status: status === "pending" ? "approved" : "pending"
            });

            res && (
                setOrders(prev => (
                    prev.map(item => (
                        item._id === id && (
                            {
                                ...item,
                                status: status === "pending" ? "approved" : "pending"
                            }
                        )
                    ))
                ))
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setOrders(data);
    }, [data]);

    return (
        <div className='table'>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableCell'>Customer</TableCell>
                            <TableCell className='tableCell'>Date</TableCell>
                            <TableCell className='tableCell'>Amount</TableCell>
                            <TableCell className='tableCell'>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders && orders?.map(order => (
                            <TableRow key={order?._id}>
                                <TableCell className='tableCell'>{order?.userId}</TableCell>
                                <TableCell className='tableCell'>{format(order?.createdAt)}</TableCell>
                                <TableCell className='tableCell'>${order?.amount}</TableCell>
                                <TableCell className='tableCell'>
                                    <span
                                        className={`status ${order?.status}`}
                                        onClick={() => handleStatus(order?._id, order?.status)}
                                    >
                                        {order?.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default List;