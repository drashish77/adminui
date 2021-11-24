import React from 'react'

const paginationFn = ({
  filteredUsers,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  pageNumberLimit,
  maxPageNumberLimit,
  setMaxPageNumberLimit,
  minPageNumberLimit,
  setMinPageNumberLimit,
}) => {
  const pages = [
    ...Array(Math.ceil(filteredUsers.length / itemsPerPage)).keys(),
  ].map((key) => ++key)

  const handleClick = (event) => {
    setCurrentPage(+event.target.id)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  // const currentItems = filteredUsers.(indexOfFirstItem, indexOfLastItem)
  const currentItems = filteredUsers.filter(
    (user, idx) => idx + 1 > indexOfFirstItem && idx < indexOfLastItem
  )

  const renderPageNumbers = pages
    .filter(
      (number) => number < maxPageNumberLimit + 1 && number > minPageNumberLimit
    )
    .map((number) => (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </li>
    ))
  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1)
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }
  const handleNextButton = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }
  let pageIncrementBtn = null
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextButton}> &hellip; </li>
  }
  let pageDecrementBtn = null
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevButton}> &hellip; </li>
  }

  return {
    currentItems,
    renderPageNumbers,
    handlePrevButton,
    handleNextButton,
    pageIncrementBtn,
    pageDecrementBtn,
    pages,
  }
}

export default paginationFn
