import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { UIInput } from '@/components/input';
import { ICreateJobRequest } from '@/utils/api/api-models';
import { UISelect } from '@/components/select';
import { UIButton } from '../button';

export interface CreateJobFormComponentProps {
  onSubmit: (e: ICreateJobRequest) => void;
  options: { value: string; label: string }[];
}

function CreateJobFormComponent(props: CreateJobFormComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onFormSubmit = React.useCallback(
    (s: { jobTitle: string; jobPriority: { value: string; label: string } }) => {
      props.onSubmit({ jobTitle: s.jobTitle, priority: s.jobPriority.value });
    },
    [props],
  );

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="row">
        <div className="col-6">
          <UIInput
            labelKey="Job Name"
            labelClassName="font-weight-bold"
            type="text"
            placeholderKey="Job Name"
            className="mb-4"
            {...register('jobTitle', {
              required: 'This field is required.',
            })}
            errorKey={errors.jobTitle?.message}
          />
        </div>
        <div className="col-4">
          <Controller
            control={control}
            name="jobPriority"
            rules={{ required: true }}
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
              <UISelect
                labelClassName="font-weight-bold"
                options={props.options}
                placeholderKey="Choose"
                labelKey="Job Priority"
                value={value}
                onChange={e => {
                  onChange(e);
                }}
                inputRef={ref}
                errorKey={error ? 'This field is required.' : ''}
              />
            )}
          />
        </div>
        <div className="col-2 d-flex align-items-center">
          <UIButton className="btn-primary" type="submit">
            <AiOutlinePlus /> Create
          </UIButton>
        </div>
      </div>
    </form>
  );
}

const _CreateJobFormComponent = React.memo(CreateJobFormComponent);

export { _CreateJobFormComponent as CreateJobFormComponent };
