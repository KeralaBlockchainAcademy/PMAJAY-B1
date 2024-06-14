async function fetchDataWithTimeout(url, timeout) {
    // Create the timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    );
  
    try {
      // Create the fetch promise
      const fetchPromise = fetch(url).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });
  
      // Use Promise.race to race between the fetch and the timeout
      const result = await Promise.race([fetchPromise, timeoutPromise]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  
  fetchDataWithTimeout('https://jsonplaceholder.typicode.com/posts', 5000)
    .then(data => console.log('Data fetched:', data))
    .catch(error => console.error('Error:', error));
  