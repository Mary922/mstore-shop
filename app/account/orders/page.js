"use client"
import React from 'react';
import {useState,useEffect} from "react";
import {getOrders} from "@/app/lib/api/orders";
import moment from "moment";
import PagData from "@/app/common/Pagination";

const ITEMS_PER_PAGE = 1;

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    let clientId;
    const client = JSON.parse(localStorage.getItem("client"));
    if (client) {
        clientId = client.id;
    }

    const requestForOrders = async (limit, offset) => {
        const ordersGet = await getOrders(clientId,limit, offset);
        const ordersData = ordersGet.data.rows;
        const ordersCount = ordersGet.data;
        // console.log('ordersGET', ordersGet)
        setPageCount(ordersCount.count);
        setOrders(ordersData);
    }

    useEffect(() => {
        (async () => {
            if (clientId) {
                requestForOrders(ITEMS_PER_PAGE, 0);
            }
        })()
    }, []);

    const navigateToOrder = (orderId) => {
        navigate(`/order/${orderId}`);
    }

    let ordersList;
    if (orders.length > 0) {
        ordersList = orders.map(order => {
            let sum = 0;
            for (let i = 0; i < order.ProductOrders.length; i++) {
                sum += order.ProductOrders[i].product_count * order.ProductOrders[i].product_price;
            }
            return (
                <tr key={order.order_id} onClick={() => navigateToOrder(order.order_id)}>
                    <td>{order.order_id}</td>

                    <td>{moment.unix(order.created_at).format("MM.DD.YYYY HH:mm")}</td>
                    <td>{sum}</td>
                </tr>
            )
        })
    }

    return (
        <>
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Заказ</th>
                            <th>Дата</th>
                            <th>Сумма</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ordersList}
                        </tbody>
                    </table>

                    <PagData
                        data={orders}
                        itemsPerPage={ITEMS_PER_PAGE}
                        request={requestForOrders}
                        pages={pageCount}
                    />

                    {/*<PagData data={orders}*/}
                    {/*         itemsPerPage={ITEMS_PER_PAGE}*/}
                    {/*         request={requestForOrders}*/}
                    {/*         pages={pageCount} />*/}
                </div>
        </>
    )
}