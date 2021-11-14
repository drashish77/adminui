const EditForm = ({ id, name, email, role, onSubmit, handleChange, ref }) => {
  return (
    <form className='edit_form' key={id} onSubmit={(e) => onSubmit(e, id)}>
      <div className='edit_form_name_email'>
        <input
          type='text'
          name='name'
          placeholder='enter Name'
          value={name}
          ref={ref}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='enter email'
          value={email}
          onChange={handleChange}
          required
        />

        <input
          type='text'
          name='role'
          placeholder='enter role'
          value={role}
          onChange={handleChange}
          required
        />

        <button type='submit'>Update</button>
        <button className='form__close'>
          <i className='far fa-times-circle'></i>
        </button>
      </div>
    </form>
  )
}

export default EditForm
