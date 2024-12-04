import {create} from "zustand";

const Store = create((set) => ({
  selectedHotel: null,
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
  bookingDetails: null,
  setBookingDetails: (details) => set({ bookingDetails: details }),
}));

export default Store;
