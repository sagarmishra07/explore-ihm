import Head from "next/head";

const CommonHead = (props: any) => {
  return (
    <Head>
      <title>{props.title}</title>
    </Head>
  );
};

export default CommonHead;
