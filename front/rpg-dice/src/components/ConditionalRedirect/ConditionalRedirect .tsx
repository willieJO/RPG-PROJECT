import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ConditionalRedirectProps {
    condition: boolean;
    redirectPath: string;
  }

  const ConditionalRedirect: React.FC<ConditionalRedirectProps> = ({ condition, redirectPath }) => {
  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.replace(redirectPath);
    }
  }, []);

  return null;
};

export default ConditionalRedirect;
