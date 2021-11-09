import { useEffect, useState } from 'react'
import { getApiResponse } from '../../utils/apiHandler'

const UserData = () => {
  const [users, setUsers] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [query, setQuery] = useState('')
  const url =
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'

  useEffect(() => {
    try {
      const performAPICall = async () => {
        const response = await getApiResponse(url)
        response && setUsers(response)
      }
      performAPICall()
    } catch (error) {
      console.log(error)
    }
  }, [])
  const editClickHandler = () => console.log('edit clicked')
  const deleteClickHandler = () => console.log('delete clicked')

  const searchHandler = (e) => {
    const value = e.target.value
    console.log(value)
    let result = []
    result = users.filter((user) => {
      if (query === '') {
        return user
      } else if (
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.role.toLowerCase().includes(value.toLowerCase())
      ) {
        return user
      }
    })
    console.log(result)
    return setFilteredData(result)
  }
  const clearInput = () => setQuery('')

  return (
    <div>
      <div className='searchInputs'>
        <input
          className='search__input'
          type='text'
          placeholder='Search by name, email and role'
          onChange={(e) => searchHandler(e)}
        />

        <div className='searchIcon'>
          {query === '' ? (
            <i className='fas fa-search'></i>
          ) : (
            <i
              className='fas fa-times-circle'
              id='clearBtn'
              onClick={() => setQuery('')}
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
          {filteredData &&
            filteredData.map((user) => {
              const { id, name, email, role } = user
              return (
                <tr key={id}>
                  <td>
                    <input
                      type='checkbox'
                      className='input'
                      name={name}
                      id={id}
                    />
                  </td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>
                    {' '}
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
    </div>
  )
}

export default UserData
setUsers(
  users.map((user) =>
    user.id === id
      ? { ...users.find((user) => user.id === id), edit: true }
      : user
  )
)
setUserEdit(users.find((user) => user.id === id))
setUpdate((prevState) => !prevState)
