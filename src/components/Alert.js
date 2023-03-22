import React from 'react'

export default function 
(props) {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
              { props.message}
      </div>
    </div>
  );
}
