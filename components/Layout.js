import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";
const name = "Hiroki Shimizu";
const siteTitle = "Next.js ブログ";

function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{siteTitle}</title>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image 
                            src="/images/profile.jpg" 
                            className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Image 
                            src="/images/profile.jpg"
                            className={`${utilStyles.borderCircle} ${styles.headerImage}`}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                )}
                
            </header>
            <main>
                {children}
            </main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">←ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;