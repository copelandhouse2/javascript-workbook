// import React from 'react';
// import Block from './Block.js';

// This functional component renders the Stacks.  It uses an array map to display
// all the blocks assigned in stacks arrays.
const Stack = (props) => {

  const updateMe = () => props.click(props.id);

  return (
    <div data-stack={props.id} onClick={updateMe}>
      {
        props.blocks.map((blockSize,index) =>
          <Block
            size={blockSize}
            key={index}
          />
        )
      }
    </div>
  );

};

// export default Stack;
