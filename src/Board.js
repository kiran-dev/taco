import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from "./Card";

const Container = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 22vw;
  background-color: #e3e4e6;
  display: flex;
  flex-direction: column;
  height: min-content;

  .header {
    display: grid;
    grid-template-columns: auto auto;
    color: #4c4d4f;
    padding: 0.5rem;
    font-size: 1.8rem;
    font-weight: bold;
  }
`

const ItemContainer = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  min-height: 100px;

  .add-card {
    outline: none;
    border: none;
    background: transparent;
    width: 100%;
    text-align: start;
    font-size: 1.4rem;
    padding: 0.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
  }
`

function Board({ boardID, title, meta, getItem, addItem }) {


  return (
    <Container>
      <div className="header">{title}</div>
      
      <Droppable droppableId={boardID}>
        {
          (provided) => (
            <ItemContainer ref={provided.innerRef} {...provided.droppableProps}>
              { meta.count > 0 && meta.itemsOrder.map((itemID, index) => <Card key={`ITEM-${itemID}`} item={getItem(itemID)} position={index}/>) }
              { 
                <button class="add-card" onClick={() => { addItem(boardID) }}>
                  Add a card...
                </button>
              }
              { provided.placeholder }
            </ItemContainer>
          )
        }
      </Droppable>
    </Container>
  );
}

export default Board;
