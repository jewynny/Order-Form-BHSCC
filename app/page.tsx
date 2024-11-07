import Link from 'next/link'

export default function Home() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>
        Body, Hair & Self Care Collective X Fluffy Details Headband
      </h1>
      <p style={styles.description}>
        Get started by placing an order below:
      </p>
      <Link href="/order" style={styles.button}>
        Place Order
      </Link>
    </main>
  )
}

const styles = {
    main: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '6rem',
      minHeight: '100vh',
      textAlign: 'center' as const,
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      maxWidth: '800px',
    },
    description: {
      fontSize: '1.25rem',
      marginBottom: '2rem',
    },
    button: {
      backgroundColor: '#193b2f',
      color: 'white',
      padding: '1.5rem 2rem',
      borderRadius: '60px',
      fontSize: '1.5rem',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
  };