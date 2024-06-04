const movies = new Map([
    [1, { title: 'Inception', genre: 'Sci-Fi', rented: false }],
    [2, { title: 'The Godfather', genre: 'Crime', rented: false }],
    [3, { title: 'Pulp Fiction', genre: 'Drama', rented: true }]
  ]);
  
  let nextId = 4;
  
  const addMovie = (title, genre) => {
    movies.set(nextId, { title, genre, rented: false });
    console.log(`Movie "${title}" added successfully.`);
    nextId++;
  };
  
  const removeMovie = (id) => {
    if (movies.delete(id)) {
      console.log(`Movie with ID ${id} removed successfully.`);
    } else {
      console.log(`No movie found with ID: ${id}`);
    }
  };
  
  const rentMovie = (id) => {
    if (movies.has(id)) {
      const movie = movies.get(id);
      if (!movie.rented) {
        movie.rented = true;
        movies.set(id, movie);
        console.log(`Movie "${movie.title}" rented successfully.`);
      } else {
        console.log(`Movie "${movie.title}" is already rented.`);
      }
    } else {
      console.log(`No movie found with ID: ${id}`);
    }
  };
  
  const returnMovie = (id) => {
    if (movies.has(id)) {
      const movie = movies.get(id);
      if (movie.rented) {
        movie.rented = false;
        movies.set(id, movie);
        console.log(`Movie "${movie.title}" returned successfully.`);
      } else {
        console.log(`Movie "${movie.title}" was not rented.`);
      }
    } else {
      console.log(`No movie found with ID: ${id}`);
    }
  };
  
  const viewAllMovies = () => {
    if (movies.size === 0) {
      console.log('No movies in the system.');
    } else {
      console.log('All Movies:');
      for (let [id, movie] of movies) {
        console.log(`ID: ${id}, Title: ${movie.title}, Genre: ${movie.genre}, Rented: ${movie.rented}`);
      }
    }
  };
  
  const generateRentedMoviesReport = () => {
    const rentedMovies = [];
    for (let [id, movie] of movies) {
      if (movie.rented) {
        rentedMovies.push({ id, ...movie });
      }
    }
  
    if (rentedMovies.length > 0) {
      console.log('Rented Movies Report:');
      rentedMovies.forEach(movie => console.log(`ID: ${movie.id}, Title: ${movie.title}, Genre: ${movie.genre}`));
    } else {
      console.log('No movies are currently rented.');
    }
  };
  
  // Hardcoded operations
  console.log("Initial Movies:");
  viewAllMovies();
  
  // Add a new movie
  addMovie('The Matrix', 'Sci-Fi');
  viewAllMovies();
  
  // Remove a movie
  removeMovie(2);
  viewAllMovies();
  
  // Rent a movie
  rentMovie(1);
  viewAllMovies();
  
  // Return a movie
  returnMovie(3);
  viewAllMovies();
  
  // Generate report of rented movies
  console.log("Rented Movies Report:");
  generateRentedMoviesReport();
  