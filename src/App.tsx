import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import ConverterForm from './components/ConverterForm';
export default function App() {
  return (
    <Layout>
      <ConverterForm />
      <Analytics />
    </Layout>
  );
}