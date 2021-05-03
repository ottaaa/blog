import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import {GetStaticProps} from 'next'
import styles from "../components/layout.module.css";

const name = '[oootta]'

export default function Home({
                                 allPostsData
                             }: {
    allPostsData: {
        date: string
        title: string
        id: string
    }[]
}) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <header className={styles.header}>
                <>
                    <img
                        src="/images/profile.jpg"
                        className={utilStyles.borderCircle}
                        height={144}
                        width={144}
                        alt={name}
                    />
                    <Link href={`https://github.com/ottaaa`}>
                        <a className={utilStyles.heading2Xl}>{name}</a>
                    </Link>
                </>
            </header>
            <section className={utilStyles.headingMd}>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({id, date, title}) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br/>
                            <small className={utilStyles.lightText}>
                                <Date dateString={date}/>
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}