"use client"
import React from 'react';
import {useState, useEffect} from "react";
import {getOrders} from "@/app/lib/api/orders";
import moment from "moment";
import PagData from "@/app/common/Pagination";
import Link from "next/link";

const ITEMS_PER_PAGE = 2;

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    let client;
    let clientId;

    if (typeof window !== "undefined") {
        client = localStorage.getItem("client");
    }

    if (typeof window !== "undefined" && client) {
        clientId = JSON.parse(localStorage.getItem("client")).id;
    }

    const requestForOrders = async (limit, offset) => {
        const ordersGet = await getOrders(clientId, limit, offset);
        const ordersData = ordersGet.data.rows;
        const ordersCount = ordersGet.data;
        setPageCount(ordersCount.count);
        setOrders(ordersData);
    }

    useEffect(() => {
        (async () => {
            if (clientId) {
                await requestForOrders(ITEMS_PER_PAGE, 0);
            }
        })()
    }, []);


    let ordersList;
    if (orders.length > 0) {
        ordersList = orders.map(order => {
            let sum = 0;
            for (let i = 0; i < order.ProductOrders.length; i++) {
                sum += order.ProductOrders[i].product_count * order.ProductOrders[i].product_price;
            }
            return (
                <tr key={order.order_id} onClick={() => navigateToOrder(order.order_id)}>
                    <td>{moment.unix(order.created_at).format("MM.DD.YYYY HH:mm")}</td>
                    <td>{sum}</td>
                </tr>
            )
        })
    }

    return (
        <>
            {
                orders && orders.length > 0 ?
                    <div className="w-full flex flex-col items-center justify-between account-main-orders">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Сумма</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ordersList}
                            </tbody>
                        </table>

                        <div className='w-full flex justify-center mt-4 orders-pag'>
                            <PagData
                                data={orders}
                                itemsPerPage={ITEMS_PER_PAGE}
                                request={requestForOrders}
                                pages={pageCount}
                            /></div>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center w-full main-orders-not-exist">
                        <h1>У вас пока нет заказов</h1>
                        <div>Чтобы добавить товары перейдите в каталог
                        </div>
                        <Link href={'/'}>
                            <button className="btn btn-primary my-5 text-white">Начать покупки</button>
                        </Link>
                    </div>
            }

        </>
    )
}