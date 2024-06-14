const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];
  
  async function fetchUrlsAndLogResponseTimes(urls) {
    for (const url of urls) {
      const start = Date.now();
      try {
        await fetch(url);
        const end = Date.now();
        rtime = end -start
        console.log(`Response time for ${url}: ${rtime} ms `);
      } catch (error) {
        console.error(`Error fetching ${url}:`,url, error);
      }
    }
  }
  
  fetchUrlsAndLogResponseTimes(urls);
  