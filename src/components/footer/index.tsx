import React from 'react';

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <a href="https://github.com/zblash/personal-job-tracer" target="_blank" rel="noreferrer">
              Repository
            </a>
            <span>© 2022 Yusuf Can Celik</span>
          </div>
        </div>
      </div>{' '}
    </footer>
  );
}

const _FooterComponent = React.memo(FooterComponent);

export { _FooterComponent as FooterComponent };
