import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';

function DropDirectioExample({
    children
}) {
  return (
    <>
     <Dropdown drop='up'>
      <Dropdown.Toggle variant="success" id="dropdown-basic" >
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu >
       {children}
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default DropDirectioExample;