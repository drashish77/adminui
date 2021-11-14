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
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])
  const deleteSelectedHandler = () => {
    const filteredData1 = users.filter((user) => !idArr.includes(user.id))
    setUsers(filteredData1)
  }

  let newArr = idArr

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
