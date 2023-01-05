import { TextField } from '../TextField';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  title: string;
  content: string;
};

const schema = yup.object().shape({
  title: yup.string().required().max(10).min(5),
  content: yup.string().required().max(20).min(10),
});

export const Form: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { isValid, errors, isSubmitted },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <div>
        <TextField
          data-testid="title"
          {...register('title')}
        />
        {errors.title && (
          <p data-testid="title-error">
            {errors.title?.message}
          </p>
        )}
      </div>
      <div>
        <TextField
          data-testid="content"
          {...register('content')}
        />
        {errors.content && (
          <p data-testid="content-error">
            {errors.content?.message}
          </p>
        )}
      </div>
      <button
        disabled={isSubmitted && !isValid}
        data-testid="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </div>
  );
};
