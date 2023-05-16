// import React from 'react';

// <div data-test-id="guest">
//   {isLoading ? 'Loading...' : 'Loaded'}
//   <main>
//     {/* {JSON.stringify(isLoading)} */}
//     <div>Add guest:</div>
//     <form onSubmit={handleSubmit}>
//       <input
//         data-test-id="guest"
//         id="firstName"
//         name="firstName"
//         value={firstName}
//         placeholder="First Name"
//         onChange={(event) => setFirstName(event.target.value)}
//       />

//       <br />
//       <br />

//       <input
//         data-test-id="guest"
//         id="lastName"
//         name="lastName"
//         value={lastName}
//         placeholder="Last Name"
//         onChange={(event) => {
//           setLastName(event.target.value);
//         }}
//       />

//       <br />
//       <br />
//       <button>Save</button>
//       {/* <button onClick={async () => await deleteAll}>delete All</button> */}
//     </form>
//     <div>list of guests:</div>
//     <br />
//     <div>
//       {guests.map((element) => {
//         return (
//           <li key={`guest-${element.id}`}>
//             {element.firstName} {element.lastName}, id: {element.id},
//             <label>
//               attending:
//               <input
//                 checked={element.attending}
//                 type="checkbox"
//                 onChange={async () => await handleChange(element.id)}
//               />
//             </label>
//             {/* {JSON.stringify(element.attending)} */}
//             <button onClick={() => removeGuest(element.id)}>
//               delete guest
//             </button>
//           </li>
//         );
//       })}
//     </div>
//     <br />
//   </main>
// </div>;
