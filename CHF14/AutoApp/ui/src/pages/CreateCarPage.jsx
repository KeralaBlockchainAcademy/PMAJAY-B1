import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateCarPage = () => {
  const [carId, setCarId] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [dom, setDom] = useState('')
  const [ownedBy, setOwner] = useState('')


  const submitForm = (e)=>{
    e.preventDefault()

    const newCar = {
      carId,
      make,
      model,
      color,
      dom,
      ownedBy
    }
    
  addCar(newCar)
    
  }

  const addCar = async (newCar)=>{
    const res = await fetch('/api/createcar', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCar)
    })

    const result = await res.json();
  
    if (result.success) {
      toast.success(`${result.message}`)
    } else {
      toast.error(`Error: ${result.message}`);
    }
   
  }

  return (
    <>
      <section className="bg-white mb-20 flex">
        <div className="container m-auto max-w-xl py-2">
          <div className="bg-blue-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-blue-800 text-center font-semibold mb-6">
              Create Car
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Car Id
                </label>
                <input
                  type="text"
                  id="carId"
                  name="carId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Car-01"
                  required
                  value={carId}
                  onChange={(e)=> setCarId(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Make
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Tata"
                  required
                  value={make}
                  onChange={(e)=> setMake(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                 Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Harrier"
                  required
                  value={model}
                  onChange={(e)=> setModel(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Black"
                  required
                  value={color}
                  onChange={(e)=> setColor(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Date Of Manufacture
                </label>
                <input
                  type="text"
                  id="dom"
                  name="dom"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. 12/12/2024"
                  required
                  value={dom}
                  onChange={(e)=> setDom(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Owner
                </label>
                <input
                  type="text"
                  id="ownedBy"
                  name="ownedBy"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Factory-01"
                  required
                  value={ownedBy}
                  onChange={(e)=> setOwner(e.target.value)}

                />
              </div>

              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create Car
                </button>
              </div>
            </form>
          </div>
        </div>

      </section>
    </>
  );
};

export default CreateCarPage;
