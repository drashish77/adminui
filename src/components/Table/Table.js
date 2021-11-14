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

  // let newArr = idArr
  // For selecting a single user
  const selectOneUser = (e) => {
    const { id, checked } = e.target
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id))
    }
    idArr.push(id)
    setIdArr([...idArr])
  }
  //For All user for a page select handler
  const selectAllCurrentUser = (e) => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(currentItems.map((li) => li.id))
    if (isCheckAll) {
      setIsCheck([])
    }
    currentItems.map((user) => idArr.push(user.id))
    setIdArr([...idArr])
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                className='input'
                type='checkbox'
                onClick={selectAllCurrentUser}
              />
            </th>
            <th className='mobile'>Name/Email/Role</th>
            <th className='desktop'>Name</th>
            <th className='desktop'>Email</th>
            <th className='desktop'>Role</th>
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
