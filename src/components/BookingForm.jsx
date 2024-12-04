import { useMutation } from "react-query";
import Api from "./Api";
import Store from "./Store";
import { useState } from "react";
import "../bookingForm.css";
const BookingForm = () => {
  const selectedHotel = Store((state) => state.selectedHotel);
  const setSelectedHotel = Store((state) => state.setSelectedHotel);
  const setBookingDetails = Store((state) => state.setBookingDetails);
  const [name,setName]=useState("")
//   const [rooms, setNoRooms] = useState(1);

  const { mutate, isLoading } = useMutation(
    (bookingData) => Api.post("/bookings", bookingData),
    {
      onSuccess: (data) => {
        alert("Booking successful!");
        setBookingDetails(data);
        setTimeout(()=>{
            setSelectedHotel(null)
        },1000)
      },
    }
  );

  const handleBooking = (event) => {
    event.preventDefault();


    mutate({
        name:name,
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
    //   No_Of_Rooms: rooms,
    });
  };

//   const handelClick = (val) => {
//     setNoRooms((prev) => prev + val);
//   };

  return (
    <form onSubmit={handleBooking}>
      <h1>Booking Details</h1>
      <p>
        Name :{" "}
        <span style={{ color: "#636363", fontSize: "none" }}>
          {selectedHotel && selectedHotel.name}
        </span>{" "}
      </p>
      <label>
        Your Name:
        <input type="text" name="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
      </label>
      {/* <div className="buttons">
        <p>No.rooms : </p>
        <button type="button" onClick={() => handelClick(-1)}>
          -
        </button>
        <button type="button" disabled>
          {rooms}
        </button>
        <button
          type="button"
          disabled={rooms === selectedHotel && selectedHotel.availableRooms}
          onClick={() => handelClick(1)}
        >
          +
        </button>
      </div> */}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Booking..." : "Submit Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
