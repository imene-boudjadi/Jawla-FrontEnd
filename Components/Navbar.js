import Link from "next/link"
import { useRouter } from "next/router";
import NavItems from "./NavbarItems"
import styles from '../styles/navbar.module.css'

const Navbar = () => {
    const router = useRouter();
    return (
        <nav className={styles.navbarTag}>
            <div className={styles.imageDiv}>
                <img className={styles.logoImage} src="https://i.ibb.co/0jSFrYr/Logo.png" alt="Logo" />
            </div>
            <ul className={styles.navItems}>
                {NavItems.map((item) => (
                    <li key={item.id}>

                        <Link legacyBehavior href={item.link}>
                            <a className={router.pathname === item.link ? "active" : ""}>
                                <span className={`${styles.navItem} ${item.id === 5 ? styles.navItem5 : ''}`}>
                                    {item.name}
                                </span>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>

    )
}

export default Navbar