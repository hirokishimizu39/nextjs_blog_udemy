import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { siteTitle } from "../components/Layout";
import Layout from "../components/Layout";
import styles from "../styles/utils.module.css";
import utilStyles from "../styles/utils.module.css";
import homeStyles from "../styles/home.module.css";
import { getPostsData } from "../lib/posts";


// SSGの場合
// SSGは、ビルド時にデータを取得して、ページを生成する
export async function getStaticProps() {
  // ブログのデータを取得 id, title, date, thumbnail
  const allPostsData = getPostsData();
  
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, Im Hiroki. Im a software engineer and a product manager.
        </p>
        <p>
          Im currently a software engineer at <a href="https://www.apple.com">Apple</a>.
        </p>
      </section>
      <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>📝Engineering Blog</h2>
        <div className={homeStyles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id} className={homeStyles.card}>
              <Link href={`/posts/${id}`}>
                <Image 
                  src={thumbnail} 
                  alt=""
                  className={homeStyles.thumbnailImage}
              />
            </Link>
            <Link href={`/posts/${id}`}>
              <h3 className={utilStyles.headingLg}>{title}</h3>
            </Link>
            <br/>
            <small className={utilStyles.lightText}>{date}</small>
          </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
