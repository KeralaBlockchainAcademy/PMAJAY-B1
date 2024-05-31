// fetch(url, [options])
//   .then(response => response.json())  // Parse the JSON response (optional)
//   .then(data => {
//     // Process the fetched data
//   })
//   .catch(error => {
//     // Handle any errors
//   });


  fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => {
        console.log(error);
      }); 