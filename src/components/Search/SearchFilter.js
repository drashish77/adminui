const SearchFilter = (props) => {
  const {
    id,
    name,
    email,
    role,
    isChecked,
    editClickHandler,
    deleteClickHandler,
    idArr,
    setIdArr,
    idArrHandler,
  } = props
  // getting Id array of the selected items
  // let newArr = idArr
  // const idArrHandler = (id) => {
  //   newArr.push(id)
  //   setIdArr([...newArr])
  // }
  return (
    <tr key={id}>
      <td>
        <input
          type='checkbox'
          className='input'
          name={name}
          id={id}
          onChange={idArrHandler}
          checked={isChecked}
        />
      </td>
      <td className='mobile'>
        <div className=''>{name}</div>
        <div className=''>{email}</div>
        <div className=''>{role}</div>
      </td>
      <td className='desktop'>{name}</td>
      <td className='desktop'>{email}</td>
      <td className='desktop'>{role}</td>
      <td>
        <i
          className='far fa-edit firstIcon'
          onClick={() => editClickHandler(id)}
        ></i>
        <i
          className='far fa-trash-alt secondIcon'
          onClick={() => deleteClickHandler(id)}
        ></i>
      </td>
    </tr>
  )
}

export default SearchFilter
