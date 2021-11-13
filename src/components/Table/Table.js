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
  const [checked, setChecked] = useState(false)
  const deleteSelectedHandler = () => {
    const filteredData1 = users.filter((user) => !idArr.includes(user.id))
    setUsers(filteredData1)
  }

  let newArr = idArr
  const idArrHandler = (id) => {
    newArr.push(id)
    setChecked((old) => !old)
    setIdArr([...newArr])
  }
  // const userIdArr = []
  const toggleCheck = () => {
    currentItems.map((user) => newArr.push(user.id))
    setChecked((old) => !old)
    setIdArr([...newArr])
  }
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
          {currentItems.map((user) => {
            return (
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
            )
          })}
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
