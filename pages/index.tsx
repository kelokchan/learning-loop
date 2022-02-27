import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const IndexPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log(router.query)

  useEffect(() => {
    if (router.query.action === 'checkoutSuccess') {
      alert('Payment successful');
    } else if (router.query.action === 'checkoutFail') {
      alert('Payment failed');
    }
  }, [router.query.action]);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const checkout = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        lineItems: [
          {
            price: 'price_1KXkwxGcJNK7g0He04bhM2Pk',
            quantity,
          },
        ],
        mode: 'payment',
        successUrl: `${window.location.origin}?action=checkoutSuccess`,
        cancelUrl: `${window.location.origin}?action=checkoutFail`,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Learning Loop</title>
      </Head>
      <Image src="/logo.png" height={250} width={250} />
      <h1>Price: RM{quantity * 50}.00</h1>
      <div className={styles.quantityRow}>
        <button onClick={decrement}>-</button>
        <h1 className={styles.quantityLabel}>{quantity}</h1>
        <button onClick={increment}>+</button>
      </div>
      <button disabled={loading} onClick={checkout}>
        {loading ? 'Loading...' : 'CHECKOUT'}
      </button>
    </div>
  );
};

export default IndexPage;
