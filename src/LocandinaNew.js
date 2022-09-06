import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function LocandinaNew(props) {

    const handleClose = () => props.setShow(false);

    let idmovie=props.idmovie;
    let edizione='';
    let tipografica= '';
    let autore= '';
    let info= '';
    let image_link= '';

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
                idmovie, edizione, tipografica, autore, info, image_link
            })
        };
        fetch('https://balinona.synology.me/locandine_backend/locandine_insert.php', postOptions)
            .then(response => response.json())
            .then(data => props.onReload());
    }

    return (
      <>
          <Modal show={props.show} onHide={handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>New locandina</Modal.Title>
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
  
  export default LocandinaNew;