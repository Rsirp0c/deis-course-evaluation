import styles from './Footer.module.css'
import { useLocation } from 'react-router-dom'

import { BiLogoGithub, BiLogoLinkedin, BiLogoInstagram } from 'react-icons/bi'

export default function Footer() {
	const location = useLocation();
	const pathIsHome = location.pathname === "/";

	let footerStyles;
	let iconStyles;
	if (pathIsHome) {
		footerStyles = styles.footerMain;
		iconStyles = styles.iconMain;
	} else {
		footerStyles = styles.footer;
		iconStyles = styles.icon;
	}

	return (
		<>
			<footer className={footerStyles}>
				<div className={styles.logo}>
					<span className={styles.copyright}>© 2023</span>
					<span className={styles.logoText}>Deis <span className={styles.logoTextBold}>Evaluation</span></span>
				</div>
				<div className={styles.footerLinks}>

					<a href="" className={styles.footerLink}><BiLogoGithub className={iconStyles} /></a>
					<a href="" className={styles.footerLink}><BiLogoLinkedin className={iconStyles} /></a>
					<a href="" className={styles.footerLink}><BiLogoInstagram className={iconStyles} /></a>
				</div>
			</footer>
		</>
	)
}