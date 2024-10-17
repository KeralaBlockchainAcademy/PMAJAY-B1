import React, { useState } from "react";
import { toast } from "react-toastify";

const ReadCarPage = () => {
  const [carId, setCarId] = useState("");
  const [carData, setCarData] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const readDetails = {
      carId,
    };

    const res = await fetch("/api/readcar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(readDetails),
    });

    const result = await res.json();
    if (result.success) {
      // console.log("dfd", result.data.value);
      // toast.success(`Read data: ${JSON.stringify(result.data.value)}`);
      setCarData(result.data.value);
    } else {
      toast.error(`Please check car id`);
    }

  };

  const resetForm = () => {
    setCarId(''); // Clear the input field
    setCarData(null); // Clear the fetched data
    // toast.info('Form reset successfully.');
  };

  return (
    <div className="bg-white flex items-center justify-center m-20">
      <div className="bg-blue-100 p-10 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Read Car
        </h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label
              htmlFor="carId"
              className="block text-gray-700 font-bold mb-2"
            >
              Car Id
            </label>
            <input
              type="text"
              id="carId"
              name="carId"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Read
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Conditionally render car data */}
        {carData && (
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Car Details
            </h3>
            <ul className="text-gray-700">
              {Object.entries(carData).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadCarPage;
