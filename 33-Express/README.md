**Questions**
-

1. You are building a logging system for an online store's server. You need to log every incoming request with its method and URL. Implement a middleware function to achieve this, and ensure that it works for all routes.(Easy)

2. You are working on a user registration system. Implement chained middleware functions: one to validate the user input (e.g., ensure the email is provided) and another to process the registration (e.g., save the user to the database). If the validation fails, return a 400 status code.(Intermediate)

3. You are developing a book review application where users can submit reviews for different books. Implement middleware to parse JSON bodies and handle a POST request to submit a review. The review data should include the book title and review content.(Easy)

4. Create a route that accepts a dynamic parameter for a user's ID and returns a welcome message including the user's ID. Ensure that the route works correctly with various user IDs.(easy)

5. You want to prevent abuse of your API by limiting the number of requests a user can make in a given period. Implement rate-limiting middleware that allows a user to make only 5 requests per minute. (Hard) (check out req.ip)

6. Your application requires occasional maintenance, during which you want to return a "Service Unavailable" message for all routes. Implement middleware to handle this.

7. Create middleware to log the IP address of the client making the request.

8. You are developing a web application using Express.js and need to serve an HTML file at the root route (/). Implement the necessary code to achieve this.

9. 


**References**
-

https://www.freecodecamp.org/news/express-explained-with-examples-installation-routing-middleware-and-more/

https://www.tutorialspoint.com/express-js-express-urlencoded-method#:~:text=urlencoded()%20is%20a%20built,based%20upon%20the%20body%2Dparser

https://expressjs.com/en/guide/using-middleware.html

https://dev.to/m__mdy__m/middleware-in-expressjs-4b4

https://javascript.plainenglish.io/what-is-middleware-express-js-and-how-it-works-explained-for-dummies-dec566c2732e
