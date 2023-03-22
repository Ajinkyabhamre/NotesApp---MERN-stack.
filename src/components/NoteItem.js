import React from 'react'

function NoteItem(props) {
    const { note } = props; //destructured from props
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, laborum rem expedita ex doloremque sint maxime distinctio ullam, laboriosam eos deleniti quibusdam sunt labore porro. Voluptatem perspiciatis culpa nihil nisi aspernatur quis voluptas et.</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem