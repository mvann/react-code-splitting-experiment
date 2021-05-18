import React from 'react';

function LazyLoaded() {
  return (
    <div className="LazyLoaded">
      This is a lazy loaded component. This should not be seen or served unless the user is logged in.
    </div>
  );
}

export default LazyLoaded;
