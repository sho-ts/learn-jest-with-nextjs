import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

const Hello = () => {
  const router = useRouter();

  const { mutate } = useMutation<unknown, Error, null>({
    mutationFn: async () => {
      return {}
    },
    onError: () => {
      alert('error');
    },
  });

  const handleSubmit = () => {
    mutate(null, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div>
      <button onClick={handleSubmit}>Click Me</button>
    </div>
  );
};

export default Hello;
