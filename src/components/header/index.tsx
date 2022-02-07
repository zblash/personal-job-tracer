import React from 'react';

function HeaderComponent() {
  return (
    <div className="header w-100 border-bottom mb-3">
      <div className="container">
        <div className="row">
          <div className="col-12 pb-3 pt-3">
            <h3 className="header-text">Personal Job Tracer</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

const _HeaderComponent = React.memo(HeaderComponent);

export { _HeaderComponent as HeaderComponent };
