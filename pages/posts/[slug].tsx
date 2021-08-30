import { DefaultLayout } from "components/DefaultLayout"
import { PostList } from "components/PostList"
import { PostListItem } from "components/PostListItem"
import { formatISO, formatPostPublishedTime } from "lib/date"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next"
import { fetchPost, fetchPosts, fetchProfile } from "services"
import { Post } from "type/api/post"
import { Profile } from "type/api/profile"

type Params = {
  slug: string
}

type Props = {
  post: Post
  prevPost: Post | null
  nextPost: Post | null
  profile: Profile
}

export const getStaticProps: GetStaticProps<Props> = async(context: GetStaticPropsContext) => {
  const params = context.params as Params
  const [
    post,
    posts,
    profile,
  ] = await Promise.all([
    fetchPost(params.slug),
    fetchPosts(),
    fetchProfile(),
  ])
  const postIndex = posts.data.findIndex(p => p.slug === post.slug)
  const prevPost = posts.data[postIndex + 1] || null
  const nextPost = posts.data[postIndex - 1] || null

  return {
    props: {
      post,
      prevPost,
      nextPost,
      profile,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async() => {
  const posts = await fetchPosts()
  const paths = posts.data.map(post => ({ params: { slug: post.slug } }))

  return {
    fallback: false,
    paths,
  }
}

const PostPage: NextPage<Props> = ({
  post,
  prevPost,
  nextPost,
  profile,
}) => {
  return (
    <DefaultLayout profile={profile}>
      <article>
        <h1 className="text-3xl font-bold">
          {post.title}
        </h1>

        <div className='text-gray-400 text-sm font-bold'>
          <time dateTime={formatISO(post.publishedAt)}>
            {formatPostPublishedTime(post.publishedAt)}
          </time>
        </div>

        <div
          className='bp'
          dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      <aside className='mt-12'>
        <PostList gapClass='gap-1'>
          {prevPost ?
            <PostListItem
              label='前の記事'
              post={prevPost}
            />
          : <></>}
          {nextPost ?
            <PostListItem
              label='次の記事'
              post={nextPost}
            />
          : <></>}
        </PostList>
      </aside>
    </DefaultLayout>
  )
}

export default PostPage
