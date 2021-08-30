import { ArticleHeadMeta } from "components/ArticleHeadMeta"
import { CommonHeadMeta } from "components/CommonHeadMeta"
import { DefaultLayout } from "components/DefaultLayout"
import { PageTitle } from "components/PageTitle"
import { Section } from "components/Section"
import { SectionTitle } from "components/SectionTitle"
import { InferGetStaticPropsType } from "next"
import { FC } from "react"
import { fetchProfile } from "services"
import { EmbededTwitterTimeline } from "components/EmbededTwitterTimeline"

export const getStaticProps = async() => {
  const [
    profile,
  ] = await Promise.all([
    fetchProfile(),
  ])

  return {
    props: {
      profile,
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const pageTitle = 'アクティビティ'

const ActivitiesPage: FC<Props> = ({
  profile,
}) => {
  return (
    <DefaultLayout profile={profile}>
      <CommonHeadMeta title={pageTitle} path='/activities' />
      <ArticleHeadMeta />

      <PageTitle>
        <h1>{pageTitle}</h1>
      </PageTitle>

      <Section>
        <section>
          <SectionTitle>
            <h2>Twitter</h2>
          </SectionTitle>

          <EmbededTwitterTimeline />
        </section>
      </Section>
    </DefaultLayout>
  )
}

export default ActivitiesPage
