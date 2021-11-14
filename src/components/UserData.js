import React, { useState, useEffect } from 'react'

import axios from 'axios'
import PaginationCard from './Pagination/PaginationCard'
import { URL } from '../constants'
import Loader from '../common/Loader'
import EditForm from './Form/EditForm'
import paginationFn from './Pagination/paginationFn'
import Table from './Table/Table'

export default function UserData() {
  const [idArr, setIdArr] = useState([])
  const [allSelectedArr, setAllSelectedArr] = useState([])
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

  const {
    currentItems,
    renderPageNumbers,
    handlePrevButton,
    handleNextButton,
    pageIncrementBtn,
    pageDecrementBtn,
    pages,
  } = paginationFn({
    filteredUsers,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    pageNumberLimit,
    maxPageNumberLimit,
    setMaxPageNumberLimit,
    minPageNumberLimit,
    setMinPageNumberLimit,
  })

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

  // const deleteSelectedHandler = () => {
  //   const filteredData1 = users.filter((user) => !idArr.includes(user.id))
  //   setUsers(filteredData1)
  // }
  // const deleteAllHandler = () => {
  //   const filteredData2 = users.filter(
  //     (user) => !allSelectedArr.includes(user.id)
  //   )
  //   setUsers(filteredData2)
  // }
  //edit handler
  const editClickHandler = (id) => {
    console.log('edit')
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...users.find((user) => user.id === id), edit: true }
          : user
      )
    )
    setUserEdit(users.find((user) => user.id === id))
    // setUpdate((prevState) => !prevState)
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

      <Table
        toggleCheck={toggleCheck}
        currentItems={currentItems}
        editClickHandler={editClickHandler}
        deleteClickHandler={deleteClickHandler}
        idArr={idArr}
        setIdArr={setIdArr}
        users={users}
        setUsers={setUsers}
      />

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
