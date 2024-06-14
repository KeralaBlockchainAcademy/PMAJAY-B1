async function fetchAndFilterPosts() {
    try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    
    const userPosts = posts.filter(post => post.userId === 1);
    userPosts.forEach(post => console.log(post.title));
    } catch (error) {
    console.error('Error fetching posts:', error);
    }
    }
    
    fetchAndFilterPosts();
    