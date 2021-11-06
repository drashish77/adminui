import React, { useState, useEffect } from 'react'

import axios from 'axios'
import SearchFilter from './SearchFilter'
import PaginationCard from '../PaginationCard'

export default function UserData() {
  const [deleted, setDeleted] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [pageNumberLimit] = useState(4)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
  const pages = []
  const url =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
  useEffect(() => {
    setLoading(true)
    axios
      .get(url)
      .then((res) => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    setFilteredCountries(
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, users])

  for (
    let i = 1;
    i <= Math.ceil(filteredCountries.length / itemsPerPage);
    i++
  ) {
    pages.push(i)
  }
  const handleClick = (event) => {
    setCurrentPage(+event.target.id)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  )
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

  const deleteClickHandler = (id) => {
    axios.delete(`${url}${id}`).then(() => setDeleted(true))
    alert('item deleted')
  }
  const editClickHandler = (id) => console.log('edit clicked:', id)

  useEffect(() => {
    axios.delete('https://reqres.in/api/posts/1').then(() => setDeleted(true))
  }, [])

  if (loading) {
    return <p>Loading countries...</p>
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
            <SearchFilter
              key={user.id}
              {...user}
              editClickHandler={() => editClickHandler(user.id)}
              deleteClickHandler={() => deleteClickHandler(user.id)}
            />
          ))}
        </tbody>
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
