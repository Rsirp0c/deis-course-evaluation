# deis-course-evaluation

## Description 
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

</details>

<details>
<summary>Main Page</summary>

- [ ] Create components that display course data 
	- [ ] Request course data from backend
	- [ ] Extract important data
	- [ ] Display data in a card

</details>

<details>
<summary>Search Page</summary>

- [ ] generate search page UI by fetching data from our backend with the mock data
	- [x] Fetch data from backend on page render 
	- [ ] Display data in a card

</details>

Backend
- [ ] Create moc data for testing in JSON
- [ ] Test API endpoints


Nice to haves
- [ ] Implement main page search bar dropdown custom UI?
</details>

## Dev Setup 
### To generate the jsdoc documentation website
1. Check that you've installed jsdoc globally: `npm install -g jsdoc`
2. Run `npm run doc` in the root directory of the project
3. Open `docs/index.html` in your browser with live servere