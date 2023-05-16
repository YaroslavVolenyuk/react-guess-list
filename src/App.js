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
      console.log('test');
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

  // updating parameters

  async function updateGuestData(id, updatedAttendStatus) {
    try {
      const response = await fetch(`http://localhost:4000/guests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: updatedAttendStatus }),
      });

      const guestInfo = await response.json();
      console.log(guestInfo);

      if (response.ok) {
        const updatedGuestAtt = guests.map((guest) => {
          if (guest.id === guestInfo.id) {
            return { ...guest, attending: updatedAttendStatus };
          }
          return guest;
        });
        setGuests(updatedGuestAtt);
      } else {
        console.log('Error occurred while updating guest data:', guestInfo);
      }
    } catch (error) {
      console.log('Error occurred while updating guest data:', error);
    }
  }

  //
  const handleChange = async (guestID) => {
    const newGuestListAtt = guests.filter((guest) => {
      return guest.id === guestID;
    });

    const updatedAttendStatus = !newGuestListAtt[0].attending;
    await updateGuestData(guestID, updatedAttendStatus);
  };

  // removing all

  async function removeAll(id) {
    try {
      const response = await fetch(`http://localhost:4000/guests/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setGuests((newEmptyList) =>
          newEmptyList.filter((guest) => console.log(guest)),
        );
      } else {
        console.log('the guest was not deleted');
      }
    } catch (error) {
      console.log(error);
    }
  }

  //

  return (
    <div data-test-id="guest">
      {isLoading ? 'Loading...' : ''}
      <main>
        {/* {JSON.stringify(isLoading)} */}
        <div>Add guest:</div>
        <form onSubmit={handleSubmit}>
          <input
            disabled={isLoading}
            data-test-id="guest"
            id="firstName"
            name="firstName"
            value={firstName}
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />

          <br />
          <br />

          <input
            disabled={isLoading}
            data-test-id="guest"
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
          <button>Save</button>
          <button onClick={() => removeAll(129)}>delete All</button>
        </form>
        <div>list of guests:</div>
        <br />
        <div>
          {guests.map((element) => {
            return (
              <li key={`guest-${element.id}`}>
                {element.firstName} {element.lastName}, id: {element.id},
                <label>
                  attending:
                  <input
                    checked={element.attending}
                    type="checkbox"
                    onChange={async () => await handleChange(element.id)}
                  />
                </label>
                <button onClick={() => removeGuest(element.id)}>
                  delete guest
                </button>
              </li>
            );
          })}
        </div>
        <br />
      </main>
    </div>
  );
}
