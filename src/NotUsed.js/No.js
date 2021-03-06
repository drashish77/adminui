import { useState } from 'react'
import SearchFilter from '../Search/SearchFilter'

const Table = ({
  users,
  setUsers,
  currentItems,
  editClickHandler,
  deleteClickHandler,
  idArr,
  setIdArr,
}) => {
  // const [checkedState, setCheckedState] = useState(
  //   new Array(currentItems.length).fill(false)
  // )
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  const deleteSelectedHandler = () => {
    const filteredData1 = users.filter((user) => !idArr.includes(user.id))
    setUsers(filteredData1)
  }

  let newArr = idArr
  // const selectOneUser = (id) => {
  //   newArr.push(id)
  //   const updatedCheckedState = checkedState.map((item, index) =>
  //     index === id ? !item : item
  //   )
  //   setCheckedState(updatedCheckedState)
  //   setIdArr([...newArr])
  // }
  const selectOneUser = (e) => {
    const { id, checked } = e.target
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id))
    }
    newArr.push(id)
    setIdArr([...newArr])
  }
  const selectAllCurrentUser = (e) => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(currentItems.map((li) => li.id))
    if (isCheckAll) {
      setIsCheck([])
    }
    currentItems.map((user) => newArr.push(user.id))
    setIdArr([...newArr])
  }
  // const userIdArr = []
  // const selectAllCurrentUser = () => {
  //   let updatedCheckedState
  //   currentItems.map((user) => {
  //     updatedCheckedState = checkedState.map((item, index) =>
  //       index === user.id ? !item : item
  //     )
  //     return newArr.push(user.id)
  //   })
  //   setCheckedState(updatedCheckedState)

  //   setIdArr([...newArr])
  // }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <div className='toggle_check'>
                <input
                  className='toggle_check'
                  type='checkbox'
                  onClick={selectAllCurrentUser}
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
            <SearchFilter
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
              editClickHandler={editClickHandler}
              deleteClickHandler={deleteClickHandler}
              idArr={idArr}
              setIdArr={setIdArr}
              // checked={checkedState[user.id]}
              isChecked={isCheck.includes(user.id)}
              idArrHandler={(e) => selectOneUser(e)}
            />
          ))}
        </tbody>
      </table>

      {idArr.length > 0 && (
        <button id='all_delete' onClick={deleteSelectedHandler}>
          {idArr.length === currentItems.length
            ? 'Delete All'
            : 'Delete Selected'}
        </button>
      )}
    </div>
  )
}

export default Table

/*
                <tr key={user.id}>
                <td>
                  <input
                    type='checkbox'
                    className='input'
                    name={user.name}
                    id={user.id}
                    onChange={() => idArrHandler(user.id)}
                    checked={checked}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <i
                    className='far fa-edit firstIcon'
                    onClick={editClickHandler}
                  ></i>
                  <i
                    className='far fa-trash-alt secondIcon'
                    onClick={deleteClickHandler}
                  ></i>
                </td>
              </tr>
  // const pages = []
  // for (let i = 1; i <= Math.ceil(filteredUsers.length / itemsPerPage); i++) {
  //   pages.push(i)
  // }
                const renderPageNumbers2 = pages.map((number) => {
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
                */
