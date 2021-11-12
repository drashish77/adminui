import SearchFilter from '../Search/SearchFilter'

const Table = ({
  toggleCheck,
  currentItems,
  editClickHandler,
  deleteClickHandler,
  idArr,
  setIdArr,
}) => {
  return (
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
          <SearchFilter
            key={user.id}
            {...user}
            editClickHandler={() => editClickHandler(user.id)}
            deleteClickHandler={() => deleteClickHandler(user.id)}
            idArr={idArr}
            setIdArr={setIdArr}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Table
