import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';

const LoggedUser = () => {  
    const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

	if (isAuthenticated)
		return (
    		<div>Hello {user.name}{' '}
        	<Button onClick={() => logout({ returnTo: window.location.origin })}>Log out</Button>
    		</div>);	
	else
		return (<Button onClick={loginWithRedirect}>Log in</Button>); 
}

function Navigator(props) {
    
    return (
        <div className="Nav">
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/">MoviesPrint</Navbar.Brand>
                <Nav className="mr-auto">
                    {/*<Nav.Link href="/ebay">eBay</Nav.Link-->
                    <Nav.Link href="/scrapy">Scrapy</Nav.Link>*/}
                </Nav>
                <Form inline method="GET" action="/Search">
                    <FormControl name="id" type="text" placeholder="Titolo film" className="mr-sm-2" defaultValue={props.selection}/>
                    <Button variant="outline-info" type="submit">Search</Button>
                    <LoggedUser/>
                </Form>
            </Navbar>
        </div>
    );
}

export default Navigator;
