import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';
import ReactPaginate from "react-paginate";


const PagData = ({data,itemsPerPage,request,pages}) => {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(pages / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage);

        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        request(itemsPerPage,newOffset);

        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="join flex justify-center mt-4">
            <ReactPaginate
                containerClassName={"join"}
                pageClassName="join-item cursor-pointer btn"
                activeClassName="btn btn-active btn-primary text-white"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                pageRangeDisplayed={5}
                breakLabel="..."
                previousClassName="join-item btn btn-outline"
                nextClassName="join-item btn btn-outline"
                renderOnZeroPageCount={null}
                previousLabel='Предыдущая'
                nextLabel='Следующая'
            />
            </div>

        </>
    )
}
export default PagData;