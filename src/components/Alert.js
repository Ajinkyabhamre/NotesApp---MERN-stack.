import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error"
    }
    let str = word.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    //   if props.alert is not null then div after && will happen

    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        {capitalize(props.alert.type)} : <strong>{props.alert.msg}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    )
  );
}

export default Alert;
