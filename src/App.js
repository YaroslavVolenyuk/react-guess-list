import './App.css';
import React, { Fragment, useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  // const [checkList, setCheckList] = useState([]); not in use
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // use effect

  // add user
  async function addUser() {
    const addPeep = await fetch('http://localhost:4000/guests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await addPeep.json();
    setGuests([...guests, createdGuest]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addUser();
  };
  // first call of the list of users

  useEffect(() => {
    async function getUser() {
      const response = await fetch('http://localhost:4000/guests/');
      const allGuest = await response.json();
      setGuests(allGuest);
    }
    getUser().catch((error) => {
      console.log(error);
    });
  }, []);

  // remove user
  async function removeGuest(id) {
    const response = await fetch(`http://localhost:4000/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    setGuests(deletedGuest);
  }

  console.log(guests);
  return (
    <div>
      <header>I'm header</header>
      <main>
        <div>Guests:</div>
        <form onSubmit={handleSubmit}>
          <input
            id="firstName"
            name="firstName"
            value={firstName}
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />

          <br />
          <br />

          <input
            id="lastName"
            name="lastName"
            value={lastName}
            placeholder="Last Name"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />

          <br />
          <br />

          <button>Submit</button>
          <button onClick={removeGuest}>Remove</button>

          <div>list of guests:</div>
          <br />

          <div>
            {guests.map((element) => {
              return (
                <li key={`guest-${element.id}`}>
                  {element.firstName} {element.lastName}, id: {element.id},
                  attending:
                  {JSON.stringify(element.attending)},
                  <button onClick={() => removeGuest(element.id)}>
                    delete guest
                  </button>
                </li>
              );
            })}
          </div>
          <br />
        </form>
      </main>
    </div>
  );
}
