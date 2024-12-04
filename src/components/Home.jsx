import { useQuery } from "react-query";
import Api from "./Api";
import Store from "./Store";
import { useRef } from "react";
import "../home.css";
import BookingForm from "./BookingForm";

function Home() {
  const { data, isLoading, error } = useQuery("hotels", () =>
    Api.get("/hotels").then((res) => res.data)
  );

  const setSelectedHotel = Store((state) => state.setSelectedHotel);
  const selectedHotel = Store((state) => state.selectedHotel);

  const bookingFormRef = useRef(null);

  const handleScrollToForm = (hotel) => {
    setSelectedHotel(hotel);
    setTimeout(() => {
      bookingFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  if (isLoading) return <p>Loading hotels...</p>;
  if (error) return <p>Error loading hotels.</p>;
  return (
    <div className="container">
      <h1>MAA Hotels</h1>
      <div className="home">
        {data.map((hotel) => (
          <div key={hotel.id} className="card">
            <div className="hotel">
              <img src={hotel.imageUrl} alt="" />
              <div className="hotel-info">
                <h2>{hotel.name}</h2>
                <p>
                  Location:
                  <span style={{ fontWeight: "normal", color: "#636363" }}>
                    {" "}
                    {hotel.location}
                  </span>{" "}
                </p>
                <p>
                  Price per night:
                  <span style={{ fontWeight: "normal", color: "#636363" }}>
                    {" "}
                    ${hotel.pricePerNight}
                  </span>{" "}
                </p>
                <p>
                  Available Rooms:
                  <span style={{ fontWeight: "normal", color: "#636363" }}>
                    {" "}
                    {hotel.availableRooms}
                  </span>{" "}
                </p>

                <button onClick={() => handleScrollToForm(hotel)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={selectedHotel ? "BlockBookingForm" : "NonBookingForm"}
        ref={bookingFormRef}
      >
        <BookingForm id="bookingform" />
      </div>
    </div>
  );
}
export default Home;
