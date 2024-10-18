
function toManuDash() {
    window.location.href = '/manufacturer';
}

function swalBasic(data) {
    swal.fire({
        // toast: true,
        icon: `${data.icon}`,
        title: `${data.title}`,
        animation: true,
        position: 'center',
        showConfirmButton: true,
        footer: `${data.footer}`,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer)
            toast.addEventListener('mouseleave', swal.resumeTimer)
        }
    })
}

function reloadWindow() {
    window.location.reload();
}

function ManWriteData() {
    event.preventDefault();
    const vin = document.getElementById('vinNumber').value;
    const make = document.getElementById('carMake').value;
    const model = document.getElementById('carModel').value;
    const color = document.getElementById('carColour').value;
    const dom = document.getElementById('dom').value;
    const flag = document.getElementById('manName').value;
    console.log(vin + make + model + color + dom + flag);

    if (vin.length == 0 || make.length == 0 || model.length == 0 || color.length == 0 || dom.length == 0 || flag.length == 0) {
        const data = {
            title: "You might have missed something",
            footer: "Enter all mandatory fields to add a new car",
            icon: "warning"
        }
        swalBasic(data);
    }
    else {
        fetch('/manuwrite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ VinNumb: vin, CarMake: make, CarModel: model, CarColor: color, DOM: dom, CarFlag: flag })
        })
            .then(function (response) {
                if (response.status == 200) {

                    const data = {
                        title: "Success",
                        footer: "Added a new car",
                        icon: "success"
                    }
                    swalBasic(data);

                } else {
                    const data = {
                        title: `Car with Vin Number ${vin} already exists`,
                        footer: "Vin Number must be unique",
                        icon: "error"
                    }
                    swalBasic(data);
                }

            })
            .catch(function (error) {
                const data = {
                    title: "Error in processing Request",
                    footer: "Something went wrong !",
                    icon: "error"
                }
                swalBasic(data);
            })
    }
}
function ManQueryData() {

    event.preventDefault();
    const Qvin = document.getElementById('QueryVinNumbMan').value;

    console.log(Qvin);

    if (Qvin.length == 0) {
        const data = {
            title: "Enter a Valid Qvin Number",
            footer: "This is a mandatory field",
            icon: "warning"
        }
        swalBasic(data)
    }
    else {
        fetch('/manuread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ QVinNumb: Qvin })
        })
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (Cardata) {
                dataBuf = Cardata["Cardata"]
                swal.fire({
                    // toast: true,
                    icon: `success`,
                    title: `Current status of car with Qvin ${Qvin} :`,
                    animation: false,
                    position: 'center',
                    html: `<h3>${dataBuf}</h3>`,
                    showConfirmButton: true,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', swal.stopTimer)
                        toast.addEventListener('mouseleave', swal.resumeTimer)
                    }
                })
            })
            .catch(function (error) {
                const data = {
                    title: "Error in processing Request",
                    footer: "Something went wrong !",
                    icon: "error"
                }
                swalBasic(data);
            })
    }
}

//Method to get the history of an item
function getItemHistory(carId) {
    console.log("postalId", carId)
    window.location.href = '/itemhistory?carId=' + carId;
}

function getMatchingOrders(carId) {
    console.log("carId", carId)
    window.location.href = 'matchOrder?carId=' + carId;
}

function RegisterCar() {
    console.log("Entered the register function")
    event.preventDefault();
    const QVinNumb = document.getElementById('QVinNumb').value;
    const carOwner = document.getElementById('carOwner').value;
    const regNumber = document.getElementById('regNumber').value;
    console.log(QVinNumb + carOwner + regNumber);

    if (QVinNumb.length == 0 || carOwner.length == 0 || regNumber.length == 0) {
        const data = {
            title: "You have missed something",
            footer: "All fields are mandatory",
            icon: "warning"
        }
        swalBasic(data)
    }
    else {
        fetch('/registerCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ QVinNumb: QVinNumb, carOwner: carOwner, regNumber: regNumber })
        })
            .then(function (response) {
                if (response.status === 200) {
                    const data = {
                        title: `Registered car ${QVinNumb} to ${carOwner}`,
                        footer: "Registered car",
                        icon: "success"
                    }
                    swalBasic(data)
                } else {
                    const data = {
                        title: `Failed to register car`,
                        footer: "Please try again !!",
                        icon: "error"
                    }
                    swalBasic(data)
                }
            })
            .catch(function (err) {
                const data = {
                    title: "Error in processing Request",
                    footer: "Something went wrong !",
                    icon: "error"
                }
                swalBasic(data);
            })
    }
}

function createOrder() {
    console.log("Entered the order function")
    event.preventDefault();
    const orderNumber = document.getElementById('orderNumber').value;
    const carMake = document.getElementById('carMake').value;
    const carModel = document.getElementById('carModel').value;
    const carColour = document.getElementById('carColour').value;
    const dealerName = document.getElementById('dealerName').value;
    console.log(orderNumber + carColour + dealerName);

    if (orderNumber.length == 0 || carMake.length == 0 || carModel.length == 0
        || carColour.length == 0 || dealerName.length == 0) {
        const data = {
            title: "You have missed something",
            footer: "All fields are mandatory",
            icon: "warning"
        }
        swalBasic(data)
    }
    else {
        fetch('/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderNumber: orderNumber, carMake: carMake, carModel: carModel, carColour: carColour, dealerName: dealerName })
        })
            .then(function (response) {
                if (response.status === 200) {
                    const data = {
                        title: `Order is created`,
                        footer: "Raised Order",
                        icon: "success"
                    }
                    swalBasic(data)

                } else {
                    const data = {
                        title: `Failed to create order`,
                        footer: "Please try again !!",
                        icon: "error"
                    }
                    swalBasic(data)
                }
            })
            .catch(function (err) {
                const data = {
                    title: "Error in processing Request",
                    footer: "Something went wrong !",
                    icon: "error"
                }
                swalBasic(data);
            })
    }
}

function readOrder() {
    console.log("Entered the order function")
    event.preventDefault();
    const orderNumber = document.getElementById('ordNum').value;

    console.log(orderNumber);

    if (orderNumber.length == 0) {
        const data = {
            title: "Enter a order number",
            footer: "Order Number is mandatory",
            icon: "warning"
        }
        swalBasic(data)
    }
    else {
        fetch('/readOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderNumber: orderNumber })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (orderData) {
                dataBuf = orderData["orderData"]
                swal.fire({
                    // toast: true,
                    icon: `success`,
                    title: `Current status of Order : `,
                    animation: false,
                    position: 'center',
                    html: `<h3>${dataBuf}</h3>`,
                    showConfirmButton: true,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', swal.stopTimer)
                        toast.addEventListener('mouseleave', swal.resumeTimer)
                    }
                })
            })
            .catch(function (err) {
                const data = {
                    title: "Error in processing Request",
                    footer: "Something went wrong !",
                    icon: "error"
                }
                swalBasic(data);
            })
    }
}

function matchOrder(orderId, carId) {
    if (!orderId || !carId) {
        const data = {
            title: "Enter a order number",
            footer: "Order Number is mandatory",
            icon: "warning"
        }
        swalBasic(data)
    } else {
        fetch('/match', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId, carId })
        })
            .then(function (response) {
                if (response.status === 200) {
                    const data = {
                        title: `Order matched successfully`,
                        footer: "Order matched",
                        icon: "success"
                    }
                    swalBasic(data)
                } else {
                    const data = {
                        title: `Failed to match order`,
                        footer: "Please try again !!",
                        icon: "error"
                    }
                    swalBasic(data)
                }
            })

            .catch(function (err) {
                const data = {
                    title: "Error in processing Request",
                    footer: "Something went wrong !",
                    icon: "error"
                }
                swalBasic(data);
            })
    }
}


function allOrders() {
    window.location.href = '/allOrders';
}


function getEvent() {
    fetch('/event', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(function (response) {
            console.log("Response is ###", response)
            return response.json()
        })
        .then(function (event) {
            dataBuf = event["carEvent"]
            swal.fire({
                toast: true,
                // icon: `${data.icon}`,
                title: `Event : `,
                animation: false,
                position: 'top-right',
                html: `<h5>${dataBuf}</h5>`,
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', swal.stopTimer)
                    toast.addEventListener('mouseleave', swal.resumeTimer)
                }
            })
        })
        .catch(function (err) {
            swal.fire({
                toast: true,
                icon: `error`,
                title: `Error`,
                animation: false,
                position: 'top-right',
                showConfirmButton: true,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', swal.stopTimer)
                    toast.addEventListener('mouseleave', swal.resumeTimer)
                }
            })
        })
}