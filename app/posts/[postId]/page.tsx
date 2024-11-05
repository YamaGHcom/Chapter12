import getFormattedDate from '@/lib/getFormattedDate';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { notFound } from "next/navigation"
import Link from 'next/link';


export function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        postId: post.id
    }))
}

type Props = {
    params: Promise<{ postId: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { postId } = await params
    // const awaitedparams = await params
    // const { postId } = awaitedparams;
    const posts = await getSortedPostsData()

    const post = posts.find(post => post.id === postId)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.title,
    }
}

export default async function Post({ params }: Props) {
    const { postId } = await params
    // const awaitedparams = await params
    // const { postId } = awaitedparams
    // console.log("awaitedparams", awaitedparams)
    // console.log("params", params)
    const posts = await getSortedPostsData()


    if (!posts.find(post => post.id === postId)) notFound()

    const { title, date, contentHtml } = await getPostData(postId)

    const pubDate = getFormattedDate(date)



    return (
        <main className='px-6 prose prose-xl prose-slate dark:prose-invert mx-auto' >
            <h1 className='text-3xl mt-4 mb-0'>{title}</h1>
            <p className="mt-0">
                {pubDate}
            </p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
                <p>
                    <Link href="/">←Back to Home</Link>
                </p>
            </article>
        </main>
    )
}
