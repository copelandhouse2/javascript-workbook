// This functional component renders the Popped block line.
const Pop = (props) => {
  return (
    <div id="pop">
      <div>Popped Block:&nbsp;</div>
      <div data-block={props.block} />
    </div>
  );
};
