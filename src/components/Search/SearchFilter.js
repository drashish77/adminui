const SearchFilter = (props) => {
  const {
    id,
    name,
    email,
    role,
    editClickHandler,
    deleteClickHandler,
    idArr,
    setIdArr,
  } = props
  // getting Id array of the selected items
  let newArr = idArr
  const idArrHandler = (id) => {
    newArr.push(id)
    setIdArr([...newArr])
  }
  return (
    <tr key={id}>
      <td>
        <input
          type='checkbox'
          className='input'
          name={name}
          id={id}
          onChange={() => idArrHandler(id)}
        />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        {' '}
        <i className='far fa-edit firstIcon' onClick={editClickHandler}></i>
        <i
          className='far fa-trash-alt secondIcon'
          onClick={deleteClickHandler}
        ></i>
      </td>
    </tr>
  )
}

export default SearchFilter
