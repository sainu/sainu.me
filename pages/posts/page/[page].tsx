import { ArticleHeadMeta } from "components/ArticleHeadMeta"
import { DefaultLayout } from "components/DefaultLayout"
import { CommonHeadMeta } from "components/CommonHeadMeta"
import { PageTitle } from "components/PageTitle"
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next"
import React from "react"
import { fetchPosts, fetchProfile } from "services"
import { PostList } from "components/PostList"
import { PostListItem } from "components/PostListItem"
import { Pagination } from "components/Pagination"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async (context: GetStaticPropsContext) => {
  let page = Number((context.params || {}).page)
  page = page > 1 ? page : 1

  const responses = await Promise.all([
    fetchProfile(),
    fetchPosts({ page }),
  ])

  return {
    props: {
      profile: responses[0],
      posts: responses[1],
      currentPage: page,
    },
  }
}

export const getStaticPaths = async() => {
  const posts = await fetchPosts()
  const totalPages = posts.meta.totalPages
  const paths = []
  for (let i = 0; i < totalPages; i++) {
    paths.push({ params: { page: (i + 1).toString() } })
  }
  return {
    paths: paths,
    fallback: false,
  }
}

const pageTitle = 'ブログ'

const PostsPage: NextPage<Props> = ({
  profile,
  posts,
  currentPage,
}) => {
  return (
    <DefaultLayout profile={profile}>
      <CommonHeadMeta title={pageTitle} path='/posts' />
      <ArticleHeadMeta />

      <PageTitle>
        <h1>{pageTitle}</h1>
      </PageTitle>

      <PostList gapClass='gap-4'>
        {posts.data.map(post => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </PostList>

      <Pagination totalCount={posts.meta.totalCount} perPage={posts.meta.perPage} current={currentPage} />
    </DefaultLayout>
  )
}

export default PostsPage
