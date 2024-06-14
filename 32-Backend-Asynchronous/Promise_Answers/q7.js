async function fetchWithTiming(url) {
    const startTime = Date.now();
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
  
    const endTime = Date.now();
    const duration = endTime - startTime;
  
    return { url, duration, data };
  }
  
  async function fetchMultipleUrls(urls) {
    const promises = urls.map(fetchWithTiming);
  
    const results = await Promise.all(promises);
  
    let longestRequest = results[0];
    for (const result of results) {
        console.log(result.duration);
      if (result.duration > longestRequest.duration) {
        longestRequest = result;
      }
    }
  
    console.log(`The request to ${longestRequest.url} took the longest time: ${longestRequest.duration} ms`);
    // return results;
  }
  
  // Example usage:
  const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/comments',
    'https://jsonplaceholder.typicode.com/albums',
  ];
  
  fetchMultipleUrls(urls)
    .then(data => console.log('All data fetched:', data))
    .catch(error => console.error('Error:', error));
  