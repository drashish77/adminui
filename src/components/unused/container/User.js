import React from 'react'

const User = ({ id, name, email, role }) => {
  return (
    <tbody>
      <td>
        <input type='checkbox' name={name} id={id} />
      </td>
      <td>
        <p className='name'>{name}</p>
      </td>
      <td>
        <p className='email'>{email}</p>
      </td>
      <td>
        <p className='role'>{role}</p>
      </td>
      <td>
        <div className='table__icon'>
          <i className='far fa-edit'></i>
          <i className='far fa-trash-alt'></i>
        </div>
      </td>
    </tbody>
  )
}

export default User
//  <div className='search'>
//       <form className='' onClick={onSearchSubmit}>
//         <div className='searchInputs'>
//           <input
//             className='search__input'
//             type='text'
//             placeholder='Search by name, email and role'
//             onChange={searchHandler}
//           />

//           <div className='searchIcon'>
//             {filteredData ? (
//               <i className='fas fa-search'></i>
//             ) : (
//               <i className='fas fa-times-circle'></i>
//             )}
//           </div>
//         </div>
//       </form>
//       <table>
//         <thead>
//           <tr className='user__table'>
//             <th>Checkbox</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         {filteredData !== 0 &&
//           filteredData.map((user) => {
//             const { id, name, email, role } = user
//             return (
//               <tbody key={user.id}>
//                 <tr className='user__table'>
//                   <td>
//                     <input
//                       type='checkbox'
//                       className='input'
//                       name={name}
//                       id={id}
//                     />
//                   </td>
//                   <td>
//                     <p className='name'>{name}</p>
//                   </td>
//                   <td>
//                     <p className='email'>{email}</p>
//                   </td>
//                   <td>
//                     <p className='role'>{role}</p>
//                   </td>
//                   <td>
//                     <div className=''>
//                       <i
//                         className='far fa-edit firstIcon'
//                         onClick={editClickHandler}
//                       ></i>
//                       <i
//                         className='far fa-trash-alt secondIcon'
//                         onClick={deleteClickHandler}
//                       ></i>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             )
//           })}
//       </table>
//     </div>
