import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

type Props = {
  e?: boolean;
};

const Hello: React.FC<Props> = ({ e }) => {
  const router = useRouter();

  const { mutate } = useMutation<unknown, Error, null>({
    mutationFn: async () => {
      if (e) {
        throw new Error();
      }

      return {};
    },
  });

  const handleSubmit = () => {
    mutate(null, {
      onSuccess: () => {
        router.push('/');
      },
      onError: () => {
        alert('test-error');
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
