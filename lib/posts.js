import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");


export function getPostsData() {
    // ファイル名をオブジェクトの配列として取得
    const fileNames = fs.readdirSync(postsDirectory);

    // ファイル名をパスとして取得
    const allPostsData = fileNames.map((fileName) => {
        // ファイル名から.mdを削除してIDとする
        const id = fileName.replace(/\.md$/, "");

        // マークダウンファイルを文字列として取得
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // マークダウンをパースする
        // パースとは、マークダウンファイルをオブジェクトに変換すること
        const matterResult = matter(fileContents);

        // idとデータを返す 
        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}


// getStaticPathsで使用する pathを返す
    /*
        [
            {
                params: {
                    id: "ssg-ssr",
                },
            },
            {
                params: {
                    id: "react-nextjs",
                },
            },
        ];
    */
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

// idに基づいてブログデータを取得
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // マークダウンをパースする
    // パースとは、マークダウンファイルをオブジェクトに変換すること
    const matterResult = matter(fileContents);

    // remarkを使用してマークダウンをHTMLに変換
    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    // マークダウンをHTMLに変換したものを文字列に変換
    const blogContentHTML = blogContent.toString();

    // idとデータを返す 
    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };
    
    
}