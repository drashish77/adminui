import { useEffect } from 'react'
import { useState } from 'react'
import PaginationCard from '../../../PaginationCard'
import { getApiResponse } from '../../../../utils/apiHandler'

const Home = () => {
  const [users, setUsers] = useState([])
  const [filteredData, setFilteredData] = useState([])
  // const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9)
  const [pageNumberLimit] = useState(4)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
  const pages = []
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pages.push(i)
  }
  const handleClick = (event) => {
    setCurrentPage(+event.target.id)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem)
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </li>
      )
    } else {
      return null
    }
  })
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

  const url =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

  useEffect(() => {
    try {
      const performAPICall = async () => {
        const response = await getApiResponse(url)
        response && setUsers(response)
      }
      performAPICall()
    } catch (error) {
      console.log(error)
    }
  }, [])
  console.log(users)

  // id, name, email, role, actions
  const editClickHandler = () => {
    console.log('Edit clicked')
  }
  const deleteClickHandler = () => {
    console.log('delete clicked')
  }
  const searchHandler = (event) => {
    const value = event.target.value
    setQuery(value)
    let result = []
    result = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.role.toLowerCase().includes(value.toLowerCase())
      )
    })
    if (value === '') {
      setQuery('')
      setFilteredData(setUsers(users))
    } else {
      setFilteredData(setUsers(result))
      setQuery(event.target.value)
    }
  }
  // const onSearchSubmit = (e) => {
  //   e.preventDefault()
  //   setQuery('')
  //   setUsers(users)
  // }
  const clearInput = () => {
    setFilteredData(users)
    setQuery('')
  }
  return (
    <div>
      {/* <Search
        placeholder='Search by name, email and role'
        data={currentItems}
        editClickHandler={editClickHandler}
        deleteClickHandler={deleteClickHandler}
        onSearchSubmit={onSearchSubmit}
        searchHandler={}
      /> */}

      {/* <form onSubmit={onSearchSubmit}>
        <input
          type='text'
          className='search'
          value={query}
          onChange={(e) => searchHandler(e)}
          placeholder='Search by name, email and role'
        />
      </form> */}
      <form className=''>
        <div className='searchInputs'>
          <input
            className='search__input'
            type='text'
            placeholder='Search by name, email and role'
            value={query}
            onChange={searchHandler}
          />

          <div className='searchIcon'>
            {filteredData ? (
              <i className='fas fa-search'></i>
            ) : (
              <i
                className='fas fa-times-circle'
                id='clearBtn'
                onClick={clearInput}
              ></i>
            )}
          </div>
        </div>
      </form>
      <table>
        <thead>
          <tr className='user__table'>
            <th>Checkbox</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        {currentItems &&
          currentItems.map((user) => {
            const { id, name, email, role } = user
            return (
              <tbody key={user.id}>
                <tr className='user__table'>
                  <td>
                    <input
                      type='checkbox'
                      className='input'
                      name={name}
                      id={id}
                    />
                  </td>
                  <td>
                    <p className='name'>{name}</p>
                  </td>
                  <td>
                    <p className='email'>{email}</p>
                  </td>
                  <td>
                    <p className='role'>{role}</p>
                  </td>
                  <td>
                    <div className=''>
                      <i
                        className='far fa-edit firstIcon'
                        onClick={editClickHandler}
                      ></i>
                      <i
                        className='far fa-trash-alt secondIcon'
                        onClick={deleteClickHandler}
                      ></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            )
          })}
      </table>

      <PaginationCard
        currentPage={currentPage}
        pages={pages}
        handlePrevButton={handlePrevButton}
        handleNextButton={handleNextButton}
        pageDecrementBtn={pageDecrementBtn}
        pageIncrementBtn={pageIncrementBtn}
        renderPageNumbers={renderPageNumbers}
      />
    </div>
  )
}

export default Home
