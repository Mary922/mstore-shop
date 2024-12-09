import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {IconContext} from "react-icons";
import {AiFillLeftCircle, AiFillRightCircle} from "react-icons/ai";




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
            <ReactPaginate
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                activeClassName={"active-pagination"}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                pageRangeDisplayed={5}
                // previousLabel="< previous"
                // nextLabel="next >"
                breakLabel="..."
                renderOnZeroPageCount={null}

                // previousLabel={
                //     <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                //         <AiFillLeftCircle />
                //     </IconContext.Provider>
                // }
                // nextLabel={
                //     <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                //         <AiFillRightCircle />
                //     </IconContext.Provider>
                // }
            />
        </>
    )
}
export default PagData;