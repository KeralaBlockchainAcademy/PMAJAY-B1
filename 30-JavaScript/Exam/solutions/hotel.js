const bookings = new Map([
    [1, { guestName: 'John Doe', roomType: 'Single', checkInDate: '2024-06-01', checkOutDate: '2024-06-05' }],
    [2, { guestName: 'Jane Smith', roomType: 'Double', checkInDate: '2024-06-10', checkOutDate: '2024-06-15' }],
    [3, { guestName: 'Emily Johnson', roomType: 'Suite', checkInDate: '2024-07-01', checkOutDate: '2024-07-10' }]
  ]);
  
  let nextId = 4;
  
  const addBooking = (guestName, roomType, checkInDate, checkOutDate) => {
    bookings.set(nextId, { guestName, roomType, checkInDate, checkOutDate });
    console.log(`Booking for ${guestName} added successfully.`);
    nextId++;
  };
  
  const cancelBooking = (id) => {
    if (bookings.delete(id)) {
      console.log(`Booking with ID ${id} canceled successfully.`);
    } else {
      console.log(`No booking found with ID: ${id}`);
    }
  };
  
  const viewAllBookings = () => {
    if (bookings.size === 0) {
      console.log('No bookings recorded.');
    } else {
      console.log('All Bookings:');
      for (let [id, booking] of bookings) {
        console.log(`ID: ${id}, Guest: ${booking.guestName}, Room: ${booking.roomType}, Check-in: ${booking.checkInDate}, Check-out: ${booking.checkOutDate}`);
      }
    }
  };
  
  const updateBooking = (id, newGuestName, newRoomType, newCheckInDate, newCheckOutDate) => {
    if (bookings.has(id)) {
      const booking = bookings.get(id);
      booking.guestName = newGuestName || booking.guestName;
      booking.roomType = newRoomType || booking.roomType;
      booking.checkInDate = newCheckInDate || booking.checkInDate;
      booking.checkOutDate = newCheckOutDate || booking.checkOutDate;
      bookings.set(id, booking);
      console.log(`Booking with ID: ${id} updated successfully.`);
    } else {
      console.log(`No booking found with ID: ${id}`);
    }
  };
  
  const generateReportByRoomType = () => {
    const report = {};
    for (let booking of bookings.values()) {
      if (!report[booking.roomType]) {
        report[booking.roomType] = 0;
      }
      report[booking.roomType]++;
    }
    
    console.log('Booking Summary by Room Type:');
    for (let roomType in report) {
      console.log(`${roomType}: ${report[roomType]} bookings`);
    }
  };
  
  // Hardcoded operations
  console.log("Initial Bookings:");
  viewAllBookings();
  
  // Add a new booking
  addBooking('Michael Brown', 'Double', '2024-08-01', '2024-08-07');
  viewAllBookings();
  
  // Cancel a booking
  cancelBooking(2);
  viewAllBookings();
  
  // Update a booking
  updateBooking(1, 'John Doe', 'Suite', '2024-06-01', '2024-06-10');
  viewAllBookings();
  
  // Generate report by room type
  console.log("Final Booking Report:");
  generateReportByRoomType();
  