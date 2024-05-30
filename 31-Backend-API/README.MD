## API DEVELOPMENT

Visit jsonplaceholder website to interact with free api's.

https://jsonplaceholder.typicode.com/

**Note that while using POST, PUT, PATCH, DELETE methods the data will not be actually deleted in the server but it will be faked as it was deleted.**

## API using cURL

Install curl using this command and check it's version

```bash
sudo apt install curl -y

curl -V
```

To send a GET request to this api using curl follow this command:

```bash
curl https://jsonplaceholder.typicode.com/todos/1
```

To send a POST request to this api using curl follow this command:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"userId": 11,"id": 202,"title": "Backend", "completed": false}' https://jsonplaceholder.typicode.com/todos
```

- -X POST: This option specifies that we're sending a POST request.

- -H "Content-Type: application/json": This header sets the content type to JSON, indicating the format of the data we're sending in the request body.

- -d '{"userId": 11,"id": 202,"title": "Backend", "completed": false}' This option specifies the data to be sent in the request body.

To send a PUT request to this api using curl follow this command:

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"userId": 1,"id": 2,"title": "API", "completed": false}' https://jsonplaceholder.typicode.com/todos/2
```

To send a DELETE request to this api using curl follow this command:

```bash
curl -X DELETE https://jsonplaceholder.typicode.com/todos/4
```

## POSTMAN

Visit this website to download postman or use the web app:

https://www.postman.com/


## RESOURCES

https://learning.postman.com/docs/getting-started/basics/navigating-postman/

https://oxylabs.io/blog/curl-post-requests

https://www.geeksforgeeks.org/rest-api-introduction/

https://www.freecodecamp.org/news/apis-for-beginners/

https://docs.google.com/presentation/d/1OgcHNZGC8S5w9IKcBeNDrI_OvRODjKMQ2_gD5GFYkz4/edit?usp=sharing


