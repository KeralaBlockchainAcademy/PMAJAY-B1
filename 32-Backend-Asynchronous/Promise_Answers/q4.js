async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
    try {
    const response = await fetch(url);
    if (!response.ok){
        throw new Error('Network response was not ok');
    } 
    return await response.json();
    } catch (error) {
    if (i === retries - 1) throw error;
    console.log(`Retrying... (${i + 1})`);
    }
    }
    }
    
    fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => console.log(data))
    .catch(error => console.error('Failed to fetch data:', error));
    