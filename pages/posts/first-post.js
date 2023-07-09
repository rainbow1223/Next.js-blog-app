import Link from "next/link"
import Head from "next/head"

import Layout from "../../components/layout"

function FirstPost() {
    return (
        <Layout>
           <Head>
             <h1>This is the first Post</h1>
           </Head>
        </Layout>
    )
}

export default FirstPost;