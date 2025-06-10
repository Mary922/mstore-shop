import React, {useState} from 'react';
import ReactPaginate from "react-paginate";

const PagData = ({data, itemsPerPage, request, pages}) => {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(pages / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage);

        request(itemsPerPage, newOffset);
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="join flex justify-center mt-4">
                <ReactPaginate
                    containerClassName="join pag-links"
                    pageLinkClassName="join-item btn btn-sm h-10 min-h-0 px-4 pagination-button"
                    pageClassName=""
                    activeLinkClassName="btn-active !bg-primary !text-primary-content"
                    disabledLinkClassName="btn-disabled opacity-50"

                    breakLabel={null}
                    breakClassName='hidden'

                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}

                    previousClassName="join-item"
                    nextClassName="join-item"
                    previousLinkClassName="join-item btn btn-sm h-10 min-h-0 btn-outline pagination-button"
                    nextLinkClassName="join-item btn btn-sm h-10 min-h-0 btn-outline pagination-button"

                    previousLabel={
                        <span className="flex items-center gap-1 prev pagination-text">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                        Назад
                    </span>
                    }
                    nextLabel={
                        <span className="flex items-center gap-1 pagination-text">
                        Далее
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </span>
                    }
                />
            </div>

        </>
    )
}
export default PagData;