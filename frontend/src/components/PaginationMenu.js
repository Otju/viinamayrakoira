import React from 'react'

import Pagination from 'react-bootstrap/Pagination'

const PaginationMenu = ({ count, currentPage, drinksPerPage, setCurrentPage }) => {

    const maxPage = Math.ceil(count / drinksPerPage)

    let paginationTabs = [1, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, maxPage]

    paginationTabs = paginationTabs.filter(page => !(page < 1 || page > maxPage))

    paginationTabs = [...new Set(paginationTabs)]

    const paginationItems = paginationTabs.map((page, i) => {
        const prevPage = paginationTabs[i - 1]
        const nextPage = paginationTabs[i + 1]
        if (prevPage && nextPage && (page - prevPage > 1 || nextPage - page > 1)) {
            return <Pagination.Ellipsis key={page} />
        }

        return (
            <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                {page}
            </Pagination.Item>
        )
    })

    return (
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev onClick={() => { if (currentPage > 1) { setCurrentPage(currentPage - 1) } }} />
            {paginationItems}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
            <Pagination.Last onClick={() => { if (currentPage < maxPage) { setCurrentPage(maxPage + 1) } }} />
        </Pagination>
    )
}

export default PaginationMenu