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
  const deleteSelectedHandler = () => {
    const filteredData1 = users.filter((user) => !idArr.includes(user.id))
    setUsers(filteredData1)
    setIdArr([])
  }

  // For selecting a single user
  const selectOneUser = (e) => {
    const { id, checked } = e.target
    if (!checked) {
      setIdArr(idArr.filter((item) => item !== id))
    } else {
      setIdArr([...new Set([...idArr, id])].sort())
    }
  }

  const toggleCheckAll = () => {
    // Check if all current users are checked
    const isAllChecked = currentItems.every((item) => idArr.includes(item.id))
    // Add or remove users from idArr state
    if (isAllChecked) {
      setIdArr(
        idArr.filter((id) => !currentItems.map((item) => item.id).includes(id))
      )
    } else {
      const idArrUpdate = [
        ...new Set([...idArr, ...currentItems.map((item) => item.id)]),
      ]
      setIdArr(idArrUpdate)
    }
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
                onChange={toggleCheckAll}
                checked={currentItems.every(({ id }) => idArr.includes(id))}
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
              isChecked={idArr.includes(user.id)}
              idArrHandler={(e) => selectOneUser(e)}
            />
          ))}
        </tbody>
      </table>
      {idArr.length > 0 && (
        <button id='all_delete' onClick={deleteSelectedHandler}>
          {currentItems.every(({ id }) => idArr.includes(id))
            ? 'Delete All'
            : 'Delete Selected'}
        </button>
      )}
    </div>
  )
}
export default Table
