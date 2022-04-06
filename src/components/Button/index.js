const Button = ({ handleSelectTrack, isSelected, uri }) => {
    return (
      <button className={isSelected? "selectedButton" : "unselectedButton"} onClick={() => handleSelectTrack(uri)}> {isSelected ? 'Deselect' : 'Select'} </button>
    );
  };
  
  export default Button;