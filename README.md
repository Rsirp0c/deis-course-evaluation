# deis-course-evaluation

## Description 

This is a course evaluation website for Brandeis students. The website allows students to search for courses and view the course evaluations. Students can also add courses to their list and view the list of courses they have added. This website is created in hope that it will be a useful tool for students to gain authnetic insights about the courses they are interested in. 

Checkout the website! [link](https://deis-evaluation.onrender.com/) 
(
	- Currently on the free tier of render, so it might take a couple minutes for the server to load
	- Requesting data from adminstration, course data only contain mock data. Search for "COSI" to see the mock data
	) 

Always welcome for any feedbacks and suggestions! email: mingshihwang@brandeis.edu


## Quick Preview
<img width="1440" alt="Screen Shot 2023-08-31 at 11 21 04 AM" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/07b09172-de18-4b0c-9891-4f9c70e45296">
<img width="1464" alt="demo1" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/744e18ea-6a2f-471a-9810-abd82247d32f">
<img width="1470" alt="demo" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/1ae16bfe-eece-4101-a68d-6ef87a6eafd8">
<img width="1470" alt="demo2" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/9ff83dd3-f74c-4353-80cb-d4f71d7cb76a">
<img width="1444" alt="Screen Shot 2023-08-27 at 10 34 18 AM" src="https://github.com/MingCWang/deis-course-evaluation/assets/73949957/67c73307-8bec-4a64-9d18-3680ccc7df5b">

## Highlights 
- User authentication both username/password and OAuth2.0 google all implemented from scratch.
- UI implemented with 95% pure CSS/CSS modules.
- JSdoc documentation for the backend API endpoints.

## Built With
- Node.js
- Express.js
- MongoDB
- Mongoose
- React.js
<details>
<summary>Roadmap</summary>

Frontend/Backend
- [ ] Implement user auth with oauth2.0 
	- [x] Generate google oauth url 
	- [ ] Handle google oauth callback
	- [ ] Store user model in database

Frontend

- [x] Implement routing for each page with react-router-dom
<details>
<summary> Implement Navbar UI :heavy_check_mark:</summary>

- [x] Implement search bar
- [x] Hide search bar in main page navbar, transform into advanced search bar 
- [x] Implement css modules for better styling
- [x] Import react-icons packages for navbar icons
- [ ] Reposition mainsearchbar to main page instead of inside the navbar 

</details>

<details>
<summary>Main Page</summary>

- [ ] Create components that display course data 
	- [x] Request course data from backend
	- [x] Extract important data
	- [x] Display data in a card
	- [ ] implement color change with respect to the rating values
	- [ ] use add to list function

</details>

<details>
<summary>Search Page</summary>

- [x] generate search page UI by fetching data from our backend with the mock data
	- [x] Fetch data from backend on page render 
	- [x] Display data in a card

</details>

Backend
- [x] Create moc data for testing in JSON
- [ ] Test API endpoints
- [ ] Input calculations for rating and grade whenever a new form is added 
JWT validation flow 
- the user logs in either with oauth2.0 or with a username and password, server responds with jwt
- jwt stores in local storage, and stores user data within userContext 
- the user sends the jwt with auth header with every request, server validates the jwt and responds with the requested data


Nice to haves
- [ ] Implement main page search bar dropdown custom UI?
</details>

## Dev Setup 
### To generate the jsdoc documentation website
1. Check that you've installed jsdoc globally: `npm install -g jsdoc`
2. Run `npm run doc` in the root directory of the project
3. Open `docs/index.html` in your browser with live servere
## Start contributing
1. Clone the repo
2. Run `npm install` inside the /backend and /frontend directory of the project
3. Running the project: 
	- Run `npm start` in the /backend directory of the project
	- Run `npm run dev` in the /frontend directory of the project
