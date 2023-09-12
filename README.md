# deis-course-evaluation

## Description 

This is a course evaluation website for Brandeis students. The website allows students to search for courses and view the course evaluations. Students can also add courses to their list and view the list of courses they have added. This website is created in hope that it will be a useful tool for students to gain authnetic insights about the courses they are interested in. 

Checkout the website! [link](https://deis-evaluation.onrender.com/) 

- Currently on the free tier of render, so it might take a couple minutes for the server to load
- Requesting data from adminstration, course data only contain mock data. Search for "COSI" to see the mock data
	

Always welcome for any feedbacks and suggestions! email: mingshihwang@brandeis.edu


## Quick Preview
<img width="1440" alt="Screen Shot 2023-08-31 at 11 21 04 AM" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/07b09172-de18-4b0c-9891-4f9c70e45296">
<img width="1464" alt="demo1" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/744e18ea-6a2f-471a-9810-abd82247d32f">
<img width="1470" alt="demo" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/1ae16bfe-eece-4101-a68d-6ef87a6eafd8">
<img width="1470" alt="demo2" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/9ff83dd3-f74c-4353-80cb-d4f71d7cb76a">
<img width="1444" alt="Screen Shot 2023-08-27 at 10 34 18 AM" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/67c73307-8bec-4a64-9d18-3680ccc7df5b">

## Features
**General**
- Advanced Search Bar : search by course name, course ID, department.
- Course Evaluation : view course evaluations from other users and submit your own evaluations
- Ratings: view analyzed data of the course such as: average rating, average grade, average difficulty, etc.

**Sign In Features**
- User Authentication : sign in with username/password or google OAuth2.0
- Liked Courses : view the list of courses that you have liked
- Evaluations: view the evaluations that you have submitted

More features coming soon!


## REST API Routes
### Course
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get course by id
- POST /api/courses/reviews - Get all evaluations with the given course id
### Auth
 - POST auth/oauth/google - generate jwt token after login with google oauth2.0
 - POST auth/login - generate jwt token after login with username/password
 - POST auth/register - register a new user
 - DELETE auth/:id - delete the user from the database
 ### Evaluations
- POST api/evaluations/forms - Create a new evaluation submission
- GET api/evaluations - Get all evaluations
- POST api/evaluations/user - Get user evaluations with the given user id
### Liked Courses
- POST api/liked-courses - Get all liked courses with the given user id
- POST api/liked-courses/add - Add a new liked course
- POST api/liked-courses/remove - Remove a liked course
## Built With
- Node.js
- Express.js
- MongoDB
- Mongoose
- React.js


## Dev Setup 
### To generate the jsdoc documentation website
1. Check that you've installed jsdoc globally: `npm install -g jsdoc`
2. Run `npm run doc` in the root directory of the project
3. Open `docs/index.html` in your browser with live servere
### To reformat the code
1. /frontend `npm run format`
## Start contributing
1. Clone the repo
2. Run `npm install` inside the /backend and /frontend directory of the project
3. Running the project: 
	- Run `npm start` in the /backend directory of the project
	- Run `npm run dev` in the /frontend directory of the project
4. Please email mingshihwang@brandeis.edu for the .env files