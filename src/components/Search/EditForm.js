const EditForm = ({ id, name, email, role, onSubmit, handleChange }) => {
  return (
    <form className='edit_form' key={id} onSubmit={(e) => onSubmit(e, id)}>
      <input
        type='text'
        name='name'
        placeholder='enter Name'
        value={name}
        onChange={handleChange}
      />
      <input
        type='email'
        name='email'
        placeholder='enter email'
        value={email}
        onChange={handleChange}
      />
      <input
        type='text'
        name='role'
        placeholder='enter role'
        value={role}
        onChange={handleChange}
      />
      <button type='submit'>Update</button>
    </form>
  )
}

export default EditForm
