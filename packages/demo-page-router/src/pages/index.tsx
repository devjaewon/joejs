import { useEffect } from 'react';
import greet from 'next-hash-router';

export default function Page() {
  useEffect(() => {
    greet();
  }, []);

  return (
    <div></div>
  );
}