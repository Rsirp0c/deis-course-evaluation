import styles from './Footer.module.css'

import { BiLogoGithub, BiLogoLinkedin, BiLogoInstagram } from 'react-icons/bi'

export default function Footer() {
	return (
		<>
			<footer className={styles.footer}>
				<div className={styles.logo}>
					<span className={styles.copyright}>© 2023</span>
					<span className={styles.logoText}>Deis <span className={styles.logoTextBold}>Evaluation</span></span>
				</div>
				<div className={styles.footerLinks}>

					<a href="" className={styles.footerLink}><BiLogoGithub className={styles.icon} /></a>
					<a href="" className={styles.footerLink}><BiLogoLinkedin className={styles.icon} /></a>
					<a href="" className={styles.footerLink}><BiLogoInstagram className={styles.icon} /></a>
				</div>
			</footer>
		</>
	)
}