import { IonIcon } from '@ionic/react';
import { cloudUpload } from 'ionicons/icons';
import {Navbar,Container, Nav, Button} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useFileInput } from '../hooks/useFileInput';

const NavbarLanding = () => {
  const location=useLocation();
  const {handleFileInputChange}=useFileInput();
  return (
    <Navbar className='customNavbar fixed-top ' variant="dark" expand="lg">
    <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
      <Navbar.Brand className='px-2'><Link to="/" className='px-2 navbar-brand'>DataAnalytica.io</Link></Navbar.Brand>
      <Navbar.Toggle className='px-2' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about-us" active={location.pathname === '/about-us'}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/login" active={location.pathname === '/login' || location.pathname === '/register'}>Sign In</Nav.Link>
          </Nav>
<div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
        </Navbar.Collapse>
        
    </Container>
  </Navbar>
  );
};

export default NavbarLanding;
