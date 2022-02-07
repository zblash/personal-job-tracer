import React from 'react';
import Modal from 'react-modal';
import { BiErrorCircle } from 'react-icons/bi';
import { UIButton } from '@/components/button';
import { useStateFromProp } from '@/utils/hooks';
import { ICreateJobRequest } from '@/utils/api/api-models';
import { Colors } from '@/utils/colors';

export interface DeleteJobModalComponentProps {
  isOpened: boolean;
  onApprove: (e: ICreateJobRequest) => void;
  jobDetail?: ICreateJobRequest;
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

function DeleteJobModalComponent(props: DeleteJobModalComponentProps) {
  const [isOpened, setIsOpened] = useStateFromProp(props.isOpened);

  const onApprove = React.useCallback(() => {
    props.onApprove(props.jobDetail);
    setIsOpened(false);
    props.onClose();
  }, [props, setIsOpened]);

  const onCloseBtnClicked = React.useCallback(() => {
    props.onClose();
    setIsOpened(false);
  }, [props, setIsOpened]);

  return (
    <Modal isOpen={isOpened} contentLabel="Delete Job Modal" style={customStyles}>
      {props.jobDetail && (
        <div className="row pb-5">
          <div className="col-12 d-flex justify-content-center">
            <BiErrorCircle color={Colors.red} width="42" height="42" />
          </div>

          <div className="col-12 mb-3 d-flex justify-content-center">
            <h4>Are you sure you want to delete it?</h4>
          </div>
          <div className="col-12 d-flex justify-content-evenly align-items-center">
            <UIButton type="button" className="btn-light btn-lg" onClick={onCloseBtnClicked}>
              Cancel
            </UIButton>
            <UIButton className="btn-primary btn-lg" type="button" onClick={onApprove}>
              Approve
            </UIButton>
          </div>
        </div>
      )}
    </Modal>
  );
}

const _DeleteJobModalComponent = React.memo(DeleteJobModalComponent);

export { _DeleteJobModalComponent as DeleteJobModalComponent };
