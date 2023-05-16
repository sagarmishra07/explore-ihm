import {Head, Html, Main, NextScript} from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/*<script src="https://www.google.com/recaptcha/api.js"></script>*/}
            </Head>
            <link rel="icon" href="/whiteLogo.svg"/>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
