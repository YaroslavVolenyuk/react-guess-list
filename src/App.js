import './App.css';
import React, { Fragment, useEffect, useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
    if (addPeep.ok) {
      setGuests([...guests, createdGuest]);
    } else {
      console.log('guest was not added');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirstName('');
    setLastName('');
    await addUser();
  };
  // first call of the list of users

  useEffect(() => {
    async function getUser() {
      const response = await fetch('http://localhost:4000/guests/');
      const allGuest = await response.json();
      setGuests(allGuest);
      setIsLoading(false);
    }
    getUser().catch((error) => {
      console.log(error);
    });
  }, []);

  // remove user

  async function removeGuest(id) {
    try {
      const response = await fetch(`http://localhost:4000/guests/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setGuests((oldGuestList) =>
          oldGuestList.filter((guest) => guest.id !== id),
        );
      } else {
        console.log('the guest was not deleted');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(guests);
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
