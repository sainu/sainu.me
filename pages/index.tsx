import type { InferGetStaticPropsType, NextPage } from 'next'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

const Home: NextPage<Props> = ({}) => {
  return (
    <div className="max-w-screen-sm mx-auto my-0">
      <p>hello</p>
    </div>
  )
}

export default Home
