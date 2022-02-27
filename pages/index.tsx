import Link from 'next/link';

const IndexPage = () => (
  <div>
    <h1>Hello 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </div>
);

export default IndexPage;
