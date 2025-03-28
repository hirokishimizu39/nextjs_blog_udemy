import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";
// 外部のデータを取得する場合は、getStaticPathsはasyncで書く
export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <>
            <Layout>
                <Head>
                    <title>{postData.title}</title>
                </Head>
                    <article>
                        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                        <div className={utilStyles.lightText}>{postData.date}</div>
                        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
                    </article>
            </Layout>
        </>
    )
}