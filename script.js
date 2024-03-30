const API_URL = "https://crudcrud.com/api/ef9dc021dfb944c68bf1c476aa95ec51/appointmentData";

document.getElementById("bookingForm").addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    seatNumber: event.target.seatNumber.value
  };

  axios.get(API_URL + `?seatNumber=${userDetails.seatNumber}`)
    .then(response => {
      const existingBooking = response.data.find(booking => booking.seatNumber === userDetails.seatNumber);
      if (existingBooking) {
        alert("ALREADY BOOKED");
      } else {
        axios.post(API_URL, userDetails)
          .then(response => {
            displayUserOnScreen(response.data);
            event.target.reset();
          })
          .catch(error => console.error(error));
      }
    })
    .catch(error => console.error(error));
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(`${userDetails.username} - Seat ${userDetails.seatNumber}`)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.getElementById("userList");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    axios.delete(`${API_URL}/${userDetails._id}`)
      .catch(error => console.error(error));
    updateTotalSeats();
  });

  editBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    axios.delete(`${API_URL}/${userDetails._id}`)
      .catch(error => console.error(error));
    updateTotalSeats();
    document.getElementById("username").value = userDetails.username;
    document.getElementById("seatNumber").value = userDetails.seatNumber;
  });

  updateTotalSeats();
}

function updateTotalSeats() {
  const totalSeatsHeader = document.getElementById("totalSeatsHeader");
  axios.get(API_URL)
    .then(response => {
      const bookings = response.data;
      if (bookings.length === 0) {
        totalSeatsHeader.textContent = "Nothing present";
      } else {
        totalSeatsHeader.textContent = "Total Seats: " + bookings.length;
        const userList = document.getElementById("userList");
        userList.innerHTML = "";
        bookings.forEach(userDetails => {
          const userItem = document.createElement("li");
          userItem.appendChild(
            document.createTextNode(`${userDetails.username} - Seat ${userDetails.seatNumber}`)
          );

          const deleteBtn = document.createElement("button");
          deleteBtn.appendChild(document.createTextNode("Delete"));
          userItem.appendChild(deleteBtn);

          const editBtn = document.createElement("button");
          editBtn.appendChild(document.createTextNode("Edit"));
          userItem.appendChild(editBtn);

          userList.appendChild(userItem);

          deleteBtn.addEventListener("click", function (event) {
            userList.removeChild(event.target.parentElement);
            axios.delete(`${API_URL}/${userDetails._id}`)
              .catch(error => console.error(error));
            updateTotalSeats();
          });

          editBtn.addEventListener("click", function (event) {
            userList.removeChild(event.target.parentElement);
            axios.delete(`${API_URL}/${userDetails._id}`)
              .catch(error => console.error(error));
            updateTotalSeats();
            document.getElementById("username").value = userDetails.username;
            document.getElementById("seatNumber").value = userDetails.seatNumber;
          });
        });
      }
    })
    .catch(error => console.error(error));
}

updateTotalSeats();








