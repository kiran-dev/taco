import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Sort, Person, CheckBox, Timer, Attachment } from '@material-ui/icons';

const Container = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  background-color: white;
  overflow: hidden;

  .title {
    font-size: 1.4rem;
    padding: 0.5rem;
  }

  img {
    border-radius: 0.5rem 0.5rem 0 0;
    width: 100%;
  }

  textarea {
    font-size: 1.4rem;
    padding: 0.5rem;
    width: 100%;
    outline: none;
    border: none;
  }

  .edit-panel {
    display: grid;
    justify-content: end;
    align-content: center;
    margin: 0.5rem;
  }

  .save-button {
    color: black;
    font-size: 1.2rem;
    margin: auto;
    border-radius: 0.5rem;
    background: transparent;
  }

  .details-bar {
    display: grid;
    grid-template-columns: auto 4rem;
    align-content: center;
  }

  .attachment-container {
    font-size: '2rem';
    margin: '0.5rem';
  }
`


function Card({ item: { id, title, owner, image, attachments }, position }) {

  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(null);

  useEffect(() => {
    setText(title);
  }, [title])

  const toggleEditability = () => {
    setEditable(!editable);
  }



  const getAttachhment = (attachment) => {
    switch(attachment.type) {
      case "Files":
        return (
          <>
            <Attachment style={{fontSize: '2rem', margin: '0.5rem'}} />{attachment.count}
          </>
        )
        break;
      case "DeadLines":
        return (
          <>
            <Timer style={{fontSize: '2rem', margin: '0.5rem'}} /> {attachment.date}
          </>
        );
        break;
      case "SubTasks":
        return (
          <>
            <CheckBox style={{fontSize: '2rem', margin: '0.5rem'}} /> {`${attachment.completedCount}/${attachment.totalCount}`}
          </>
        );
        break;
    }
  }

  return (
    <Draggable draggableId={id} index={position}>
      { 
        (provided) => (
          <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            {
              (image && image !== "") && <img src={image} />
            }

            {
              editable &&
                <>
                  <textarea onChange={(e) => setText(e.target.value)} value={text} autoFocus/>
                  <div class="edit-panel">
                    <button onClick={toggleEditability} class="save-button">Done</button>
                  </div>
                </>
            }

            {
              !editable &&
              <>
                <div className="title" onDoubleClick={toggleEditability}>{text}</div>
                <div class="details-bar">
                  <div>
                    <Sort style={{fontSize: '2rem', margin: '0.5rem'}} onClick={toggleEditability}/>
                    {
                      (attachments && attachments.length > 0) && attachments.map((attachment) => getAttachhment(attachment))
                    }
                  </div>

                  <Person style={{fontSize: '3rem', margin: '0.5rem'}}/>
                </div>
              </>
            }
            

            <div>

            </div>
          </Container>
        )
      }
    </Draggable>
    
  );
}

export default Card;
