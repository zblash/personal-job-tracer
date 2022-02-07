import React from 'react';
import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { UIInput } from '@/components/input';
import { ICreateJobRequest } from '@/utils/api/api-models';
import { UISelect } from '@/components/select';
import { UIButton } from '@/components/button';
import { useStateFromProp } from '@/utils/hooks';

export interface EditJobModalComponentProps {
  isOpened: boolean;
  onSubmit: (e: ICreateJobRequest) => void;
  jobDetail?: ICreateJobRequest;
  options: { value: string; label: string }[];
  onClose: () => void;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function EditJobModalComponent(props: EditJobModalComponentProps) {
  const [isOpened, setIsOpened] = useStateFromProp(props.isOpened);
  const { register, handleSubmit, control } = useForm();

  const onFormSubmit = React.useCallback(
    (s: { jobTitle: string; jobPriority: { value: string; label: string } }) => {
      props.onSubmit({ jobTitle: s.jobTitle, priority: s.jobPriority.value });
      setIsOpened(false);
      props.onClose();
    },
    [props, setIsOpened],
  );

  const onCloseBtnClicked = React.useCallback(() => {
    props.onClose();
    setIsOpened(false);
  }, [props, setIsOpened]);

  return (
    <Modal isOpen={isOpened} contentLabel="Delete Job Modal" style={customStyles}>
      {props.options && props.jobDetail && (
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="row pb-5">
            <div className="col-12 d-flex justify-content-center">
              <h4>Job Edit</h4>
            </div>
            <div className="col-12">
              <UIInput
                labelKey="Job Name"
                labelClassName="font-weight-bold"
                type="text"
                placeholderKey="Job Name"
                value={props.jobDetail?.jobTitle}
                className="mb-4"
                {...register('jobTitle', {
                  required: 'This field is required.',
                })}
                readOnly
              />
            </div>
            <div className="col-12 mb-5">
              <Controller
                control={control}
                name="jobPriority"
                defaultValue={props.options?.find(
                  (opt: { label: string; value: string }) => props.jobDetail.priority === opt.value,
                )}
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
                  />
                )}
              />
            </div>
            <div className="col-12 d-flex justify-content-evenly align-items-center">
              <UIButton type="button" className="btn-light btn-lg" onClick={onCloseBtnClicked}>
                Cancel
              </UIButton>
              <UIButton className="btn-primary btn-lg" type="submit">
                Save
              </UIButton>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
}

const _EditJobModalComponent = React.memo(EditJobModalComponent);

export { _EditJobModalComponent as EditJobModalComponent };
