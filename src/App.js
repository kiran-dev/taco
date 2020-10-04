import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { setupResponse } from "./data.js";
import Board from "./Board";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  background: rgb(0,12,16);
  background: linear-gradient(0deg, rgba(0,12,16,1) 0%, rgba(89,196,216,1) 0%, rgba(28,131,189,1) 100%);
`

const Header = styled.div`
  color: white;
  display: grid;
  margin: 0.5rem 1.5rem;
  align-content: baseline;
  grid-template-columns: auto auto;
  padding: 0.5rem;

  .left {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: start;
    align-content: end;
  }

  .left .logo {
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    margin: auto auto auto 0;

    ::after {
      content: "|";
      font-size: 1rem;
      margin: 0 1rem;
      font-weight: normal;
    }
  }

  .left .branding {
    font-size: 1.5rem;
    margin: auto auto auto 0;

    ::after {
      content: "|";
      font-size: 1rem;
      margin: 0 1rem;
      font-weight: normal;
    }
  }

  .left .setting {
    font-size: 1.5rem;
    margin: auto auto auto 0;
  }

  .menu {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: underline;
    display: grid;
    justify-content: end;
  }
`
const Content = styled.div`
  margin: 0.5rem;
`

const Wall = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

function App() {
  const [boards, setBoards] = useState(setupResponse.boards);
  const [items, setItems] = useState(setupResponse.items);

  const getBoard = (boardID) => boards.find(board => board.id === boardID);
  const getItem = (itemID) => items.find(item => item.id === itemID);

  const onDrag = (dragData) => {
    const { destination, source, draggableId } = dragData;

    if (!destination) return;

    const sameBoard = destination.droppableId === source.droppableId;
    const sameIndex = destination.index === source.index;

    if (sameBoard && sameIndex) return;

    if (sameBoard) {
      const board = getBoard(destination.droppableId);
      const newItemsOrder = Array.from(board.meta.itemsOrder);
      newItemsOrder.splice(source.index, 1);
      newItemsOrder.splice(destination.index, 0, draggableId);

      const newBoard = { ...board, meta: { count: board.meta.count, itemsOrder: newItemsOrder } };
      const newBoards = boards.map((board) => {
        if (board.id === newBoard.id) return newBoard;
        return board;
      })

      setBoards(newBoards)
    } else {
      const sourceBoard = getBoard(source.droppableId);
      const destinationBoard = getBoard(destination.droppableId);
      
      const newSourceItemsOrder = Array.from(sourceBoard.meta.itemsOrder);
      const newDestinationItemsOrder = Array.from(destinationBoard.meta.itemsOrder);
      newSourceItemsOrder.splice(source.index, 1);
      newDestinationItemsOrder.splice(destination.index, 0, draggableId);

      const newSourceBoard = { ...sourceBoard, meta: { count: sourceBoard.meta.count - 1, itemsOrder: newSourceItemsOrder } };
      const newDestinationBoard = { ...destinationBoard, meta: { count: destinationBoard.meta.count + 1, itemsOrder: newDestinationItemsOrder } };
      const newBoards = boards.map((board) => {
        if (board.id === newSourceBoard.id) return newSourceBoard;
        if (board.id === newDestinationBoard.id) return newDestinationBoard;
        return board;
      })

      setBoards(newBoards)
    }
  }

  const newItem = (boardID) => {
    return {
      id: `_${Math.random().toString(36).substr(2, 9)}`,
      title: "Untitled",
      boardID,
      image: null,
      resources: [],
      owner: {
        name: "This Guy",
        icon: ""
      }
    }
  }

  const addItem = (boardID) => {
    const board = getBoard(boardID);
    const item = newItem(boardID)

    setItems([...items, item]);

    const newItemsOrder = Array.from(board.meta.itemsOrder);
    newItemsOrder.push(item.id);

    const newBoard = { ...board, meta: { count: board.meta.count + 1, itemsOrder: newItemsOrder } };
    const newBoards = boards.map((board) => {
      if (board.id === newBoard.id) return newBoard;
      return board;
    })

    setBoards(newBoards)
  }

  return (
    <Container>
      <Header>
        <div className="left">
          <div className="logo">Taco's Taco</div>
          <div className="branding">Taco & Co</div>
          <div className="setting">Team Visible</div>
        </div>
        <div className="menu">Show Menu</div>
      </Header>
      <Content>
        <DragDropContext onDragEnd={onDrag}>
          <Wall>
            {
              boards.map((board, index) => {
                return (
                  <Board key={`BOARD-${index}`} boardID={board.id} title={board.title} meta={board.meta} getItem={getItem} addItem={addItem}/>
                );
              })
            }
          </Wall>
        </DragDropContext>
        
      </Content>
    </Container>
  );
}

export default App;
