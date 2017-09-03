import React from 'react';
import Square from './Square';

const Category = (props) => {

  return (
    /***** CODE HERE ****/
    // Just dummy data below.
    <div>
      <h2>{props.id}</h2>
      <Square id="1" money="$100" />
      <Square id="2" money="$200" />
      <Square id="3" money="$300" />
      <Square id="4" money="$400" />
      <Square id="5" money="$500" />
    </div>
  ); // return

}  // functional component Category

export default Category;
