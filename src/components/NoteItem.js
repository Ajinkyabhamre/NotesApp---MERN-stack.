import React from 'react'

function NoteItem(props) {
    const { note } = props; //destructured from props
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex ">
            <h5 className="mr-auto p-2 card-title"> {note.title}</h5>
            <div className="p-2">
              <i className="fa-regular fa-trash-can mx-2"></i>
              <i className="fa-regular fa-pen-to-square mx-2"></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem