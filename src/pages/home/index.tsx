import * as React from 'react';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { UIButton } from '@/components/button';
import { CreateJobFormComponent } from '@/components/create-job-form';
import { ICreateJobRequest } from '@/utils/api/api-models';
import { UITableComponent } from '@/components/table';
import { ArrayUtils } from '@/utils/arrays';
import { useJobFilter } from '@/hooks/job-filter';
import { getPriorities } from '@/utils/api/requests';
import { EditJobModalComponent } from '@/components/edit-job-modal';
import { DeleteJobModalComponent } from '@/components/delete-job-modal';
import { CookiesHelpers } from '@/utils/cookies-helper';

function HomePage() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedJob, setSelectedJob] = React.useState<ICreateJobRequest>();
  const [isEditPopupOpened, setIsEditPopupOpened] = React.useState<boolean>(false);
  const [isDeletePopupOpened, setIsDeletePopupOpened] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<{ value: string; label: string }[]>();
  const [sortType, setSortType] = React.useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = React.useState('');
  const [values, setValues] = React.useState<ICreateJobRequest[]>(
    CookiesHelpers.getCookie('jobs') ? CookiesHelpers.getCookie('jobs') : [],
  );

  const { filteredValues, isFiltered, renderFilter } = useJobFilter(values);
  /*
  HomePage Lifecycle
  */
  React.useEffect(() => {
    if (sortType === 'asc') {
      setValues(ArrayUtils.sortAsc(values, sortBy));
    } else {
      setValues(ArrayUtils.sortDesc(values, sortBy));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, sortBy]);

  React.useEffect(() => {
    setLoading(true);
    getPriorities()
      .then(data => {
        setOptions(data.priorities);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  /*
  HomePage Functions
  */
  const createJob = React.useCallback(
    (e: ICreateJobRequest) => {
      setValues(prev => [...prev, e]);
      CookiesHelpers.setCookie('jobs', [...values, e]);
    },
    [values],
  );

  return (
    <>
      {!loading && (
        <div className="container">
          <div className="col-12 pt-3 mb-3">
            <h4>Create New Job</h4>
          </div>

          <CreateJobFormComponent
            options={options}
            onSubmit={(e: ICreateJobRequest) => {
              createJob(e);
            }}
          />

          <div className="row mt-3 pt-4 border-top">
            <div className="col-12 d-flex justify-content-between mb-3">
              <h4>Job List</h4>
              <span>
                {isFiltered ? `(${filteredValues.length}` : `(${values.length}`}
                {`/${values.length})`}
              </span>
            </div>
            <div className="col-12">{renderFilter()}</div>
            <UITableComponent
              columns={[
                {
                  Header: 'Name',
                  accessor: 'jobTitle',
                  sort: true,
                  sortType: sortBy === 'jobTitle' ? sortType : 'desc',
                },
                {
                  Header: 'Priority',
                  accessor: 'priority',
                  sort: true,
                  sortType: sortBy === 'priority' ? sortType : 'desc',
                },
                {
                  Header: 'Action',
                  accessor: 'actions',
                  customRenderer: (item: { jobTitle: string; priority: string }) => {
                    return (
                      <>
                        <div className="d-flex flex-md-row flex-column justify-content-around">
                          <UIButton
                            onClick={() => {
                              setIsEditPopupOpened(true);
                              setSelectedJob(item);
                            }}
                            className="btn-light mb-2"
                          >
                            <VscEdit />
                          </UIButton>
                          <UIButton
                            onClick={() => {
                              setIsDeletePopupOpened(true);
                              setSelectedJob(item);
                            }}
                            className="btn-light mb-2"
                          >
                            <VscTrash />
                          </UIButton>
                        </div>
                      </>
                    );
                  },
                },
              ]}
              data={isFiltered ? filteredValues : values}
              onSortChange={e => {
                setSortBy(e);
              }}
              onSortTypeChange={e => {
                setSortType(e);
              }}
            />
          </div>
          <EditJobModalComponent
            onClose={() => {
              setIsEditPopupOpened(false);
            }}
            options={options}
            onSubmit={() => {}}
            jobDetail={selectedJob}
            isOpened={isEditPopupOpened}
          />
          <DeleteJobModalComponent
            onClose={() => {
              setIsDeletePopupOpened(false);
            }}
            onApprove={() => {}}
            jobDetail={selectedJob}
            isOpened={isDeletePopupOpened}
          />
        </div>
      )}
    </>
  );
}

const PureHomePage = React.memo(HomePage);

export { PureHomePage as HomePage };
