import { useEffect, useState } from "react"
import styles from './search.module.css'

function Error() {
	return (
		<>
			<div className={styles.errorContainer}>
				<p className={styles.error}>Error fetching course data</p>
			</div>
		</>
	)
}

// export async function Loader() {
// 	const res = await fetch('http://localhost:3000/api/courses')
// 	if (res.status === 404) {
// 		throw new Response("Not Found", { status: 404 });
// 	}
// 	const data = await res.json()
// 	return data
// }
export default function Search() {

	const [data, setData] = useState([])
	const [error, setError] = useState(false)


	useEffect(() => {
		fetch('http://localhost:3000/api/courses')
			.then(res => {
				console.log(res)
				setData(res)
			})
			.catch(err => {
				console.log(err)
				setError(true)
			})
	}, [])

	console.log(data)

	if (error) return <Error />

	return (
		<>

			<div>
				<h1>Search</h1>
			</div>
		</>
	)
}