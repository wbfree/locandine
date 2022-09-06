import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function LocandinaEdit(props) {
    

    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);

    let id= props.item.idlocandina;
    let edizione= props.item.edizione;
    let tipografica= props.item.tipografica;
    let autore= props.item.autore;
    let info= props.item.info;
    let image_link= props.item.image_link;

    const handleChangeEdizione = (event) => {edizione = event.target.value}
    const handleChangeTipografica = (event) => {tipografica = event.target.value}
    const handleChangeAutore = (event) => {autore = event.target.value}
    const handleChangeInfo = (event) => {info = event.target.value}
    const handleChangeLink = (event) => {image_link = event.target.value}

    const handleSubmit = () => {
        // Simple POST request with a JSON body using fetch
        props.setShow(false);
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id, edizione, tipografica, autore, info, image_link
            })
        };
        fetch('https://balinona.synology.me/locandine_backend/locandine_update.php', postOptions)
            .then(response => response.json())
            .then(data => props.onReload());
    }

    const handleDelete = () => {
        // Simple POST request with a JSON body using fetch
		if (window.confirm("Confermi cancellazione?")) {
		    //Logic to delete the item
	        props.setShow(false);
	        const postOptions = {
	            method: 'POST',
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify({ id })
	        };
	        fetch('https://balinona.synology.me/locandine_backend/locandine_delete.php', postOptions)
	            .then(response => response.json())
	            .then(data => props.onReload() );
		}
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>Edit</Button>&nbsp;
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
  
        <Modal show={props.show} onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Edit locandina</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Edizione</Form.Label>
                <Form.Control type="text" placeholder="tipo edizione" defaultValue={edizione} onChange={handleChangeEdizione}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Tipografica</Form.Label>
                <Form.Control type="text" placeholder="tipografica" defaultValue={tipografica} onChange={handleChangeTipografica}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Autore</Form.Label>
                <Form.Control type="text" placeholder="autore" defaultValue={autore} onChange={handleChangeAutore}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Info</Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={info}  onChange={handleChangeInfo} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Link immagine</Form.Label>
                <Form.Control type="text" placeholder="link" defaultValue={image_link} onChange={handleChangeLink}/>
            </Form.Group>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );  
}
  
  export default LocandinaEdit;