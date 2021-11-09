const PaginationCard = ({
  currentPage,
  pages,
  handlePrevButton,
  handleNextButton,
  pageDecrementBtn,
  pageIncrementBtn,
  renderPageNumbers,
}) => {
  return (
    <ul className='pageNumbers'>
      <li className='prev_next'>
        <button
          className=''
          disabled={currentPage === pages[0] ? true : false}
          onClick={handlePrevButton}
        >
          <i className='fas fa-backward'></i>
        </button>
      </li>
      {pageDecrementBtn}
      {renderPageNumbers}

      {pageIncrementBtn}
      <li className='prev_next'>
        <button
          className=''
          disabled={currentPage === pages[pages.length - 1] ? true : false}
          onClick={handleNextButton}
        >
          <i className='fas fa-forward'></i>
        </button>
      </li>
    </ul>
  )
}

export default PaginationCard
