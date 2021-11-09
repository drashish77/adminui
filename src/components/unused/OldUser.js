import React, { useState, useEffect, Fragment } from 'react'

import axios from 'axios'
import SearchFilter from './SearchFilter'
import PaginationCard from './PaginationCard'
import { URL } from '../../constants'
import Loader from '../../common/Loader'
import EditForm from './EditForm'
import paginationFn from './paginationFn'

export default function UserData() {
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
    id: null,
    name: '',
    email: '',
    role: '',
  })
  const handleChange = (e) => setUserEdit({ [e.target.name]: e.target.value })
  const pages = []

  useEffect(() => {
    setLoading(true)
    axios
      .get(URL)
      .then((res) => {
        // setUsers(res.data)
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

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, users])

  const deleteClickHandler = (id) => {
    const data = users.filter((user) => user.id !== id)
    setUsers(data)
  }
  const editClickHandler = (id) => {
    let tempUsers = users
    const index = tempUsers.findIndex((user) => user.id === id)
    tempUsers[index].edit = true
    setUsers(tempUsers)
    setUpdate((prevState) => !prevState)
    // const EditableUser = users.filter((user) => user.id === id)
    // console.log(EditableUser[0])
  }
  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = users
    const index = tempUsers.findIndex((user) => user.id === id)
    tempUsers[index].name = nameRef.current.value
    tempUsers[index].email = emailRef.current.value
    tempUsers[index].role = roleRef.current.value
    tempUsers[index].edit = false
    setUsers(tempUsers)
    setUpdate((prevState) => !prevState)
  }
  const onSubmit = (e, id) => {
    const oldUsers = users.filter((user) => user.id !== id)
    const index = users.findIndex((user) => user.id === id)

    e.preventDefault()
    const newUser = { id, ...userEdit }
    const data = [...oldUsers, newUser]
    console.log(data)
    setUsers(data)
  }

  const {
    currentItems,
    renderPageNumbers,
    handlePrevButton,
    handleNextButton,
    pageIncrementBtn,
    pageDecrementBtn,
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
            <th>Checkbox</th>
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
              />
            </Fragment>
          ))}
        </tbody>
      </table>
      {filteredUsers.map(
        (user) =>
          user.edit && (
            <EditForm
              key={user.id}
              id={user.id}
              email={user.email}
              name={user.name}
              role={user.role}
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
