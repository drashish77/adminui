import React, { useState, useEffect, Fragment } from 'react'

import axios from 'axios'
import SearchFilter from './SearchFilter'
import PaginationCard from './PaginationCard'
import { URL } from '../../constants'
import Loader from '../../common/Loader'
import EditForm from './EditForm'

export default function UserData() {
  const [idArr, setIdArr] = useState([])
  const [allSelectedArr, setAllSelectedArr] = useState([])
  const [update, setUpdate] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [pageNumberLimit] = useState(4)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
  const [userEdit, setUserEdit] = useState({
    name: '',
    email: '',
    role: '',
  })
  // console.log(idArr)
  //user property update
  const handleChange = (e) =>
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value })

  useEffect(() => {
    setLoading(true)
    axios
      .get(URL)
      .then((res) => {
        setLoading(false)
        const data = JSON.stringify(res.data)
        localStorage.setItem('users', data)
        const finalData = localStorage.getItem('users')
        setUsers(JSON.parse(finalData))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  //search filter
  useEffect(() => {
    setFilteredUsers(
      users &&
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase())
        )
    )
  }, [search, users])

  //pagination part
  const pages = []
  for (let i = 1; i <= Math.ceil(filteredUsers.length / itemsPerPage); i++) {
    pages.push(i)
  }
  const handleClick = (event) => {
    setCurrentPage(+event.target.id)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
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

  //delete handler
  const deleteClickHandler = (id) => {
    const data = users.filter((user) => user.id !== id)
    setUsers(data)
  }

  const userIdArr = []
  const toggleCheck = () => {
    currentItems.map((user) => userIdArr.push(user.id))
    setAllSelectedArr(userIdArr)
    // setAllSelectedArr((prevState) => {
    //   const newState = { ...prevState }
    //   newState[allSelectedArr] = !prevState[allSelectedArr]
    //   return newState
    // })
  }
  console.log(userIdArr)
  const deleteSelectedHandler = () => {
    const filteredData1 = users.filter((user) => !idArr.includes(user.id))
    setUsers(filteredData1)
  }
  const deleteAllHandler = () => {
    const filteredData2 = users.filter(
      (user) => !allSelectedArr.includes(user.id)
    )
    setUsers(filteredData2)
  }
  //edit handler
  const editClickHandler = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...users.find((user) => user.id === id), edit: true }
          : user
      )
    )
    setUserEdit(users.find((user) => user.id === id))
    setUpdate((prevState) => !prevState)
  }

  const onSubmit = (e, id) => {
    e.preventDefault()
    const data = users.map((user) =>
      user.id === id ? { ...user, ...userEdit, edit: false } : user
    )
    setUsers(data)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='App'>
      <div className='searchInputs'>
        <input
          className='search__input'
          type='text'
          placeholder='Search by name, email and role'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className='searchIcon'>
          {search === '' ? (
            <i className='fas fa-search'></i>
          ) : (
            <i
              className='fas fa-times-circle'
              id='clearBtn'
              onClick={() => setSearch('')}
            ></i>
          )}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <div className='toggle_check'>
                <input
                  className='toggle_check'
                  type='checkbox'
                  onClick={toggleCheck}
                />
              </div>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <Fragment key={user.id}>
              <SearchFilter
                {...user}
                editClickHandler={() => editClickHandler(user.id)}
                deleteClickHandler={() => deleteClickHandler(user.id)}
                idArr={idArr}
                setIdArr={setIdArr}
              />
            </Fragment>
          ))}
        </tbody>
      </table>

      {allSelectedArr.length > 0 && (
        <button id='all_delete' onClick={deleteAllHandler}>
          Delete All
        </button>
      )}
      {idArr.length > 0 && (
        <button id='all_delete' onClick={deleteSelectedHandler}>
          Delete Selected
        </button>
      )}
      {filteredUsers.map(
        (user) =>
          user.edit && (
            <EditForm
              key={user.id}
              id={user.id}
              name={userEdit.name}
              email={userEdit.email}
              role={userEdit.role}
              onSubmit={onSubmit}
              handleChange={handleChange}
            />
          )
      )}
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
