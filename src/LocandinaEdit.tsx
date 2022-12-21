/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { _Component } from './_component'

function LocandinaEdit(props: any) {

  const backendHost = 'https://balinona.synology.me/locandine_backend/'

  const illustratori :any = _Component.GetStorage('illustratori').Get();
  const tipografiche :any = _Component.GetStorage('tipografiche').Get();


  const [show, setShow] = useState<boolean>(false);
  const [item, setItem] = useState<any>([]);

  const handleClose = () => setShow(false);
  const getUrl = () => {
    return backendHost + 'api.php?table=_edizioni&id=' + props.item.idedizione;
  }

  const handleNew = () => {
    console.log(props.item)
    setItem(props.item); setShow(true)

  }
  const handleShow = () => {
    fetch(getUrl())
      .then(response => response.json())
      .then(data => { setItem(data[0]); setShow(true) })
  }

  const handleSubmit = () => {
    // Simple POST request with a JSON body using fetch
    setShow(false);
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item })
    };
    fetch(getUrl(), postOptions)
      .then(response => response.json())
      .then(data => props.onReload());
  }

  const handleDelete = () => {
    // Simple POST request with a JSON body using fetch
    if (window.confirm("Confermi cancellazione?")) {
      //Logic to delete the item
      setShow(false);
      const postOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item })
      };
      fetch(getUrl(), postOptions)
        .then(response => response.json())
        .then(data => props.onReload());
    }
  }

  return (
    <>
      {props.item.idedizione > 0 && <Button variant="primary" onClick={handleShow}>Edit</Button>}&nbsp;
      {props.item.idedizione > 0 && <Button variant="danger" onClick={handleDelete}>Delete</Button>}&nbsp;
      {props.item.idedizione === "0" && <Button variant="success" onClick={handleNew}>New</Button>}

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit edizione</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Edizione</Form.Label>
              <Form.Control as="select" value={item.tipo} onChange={(event) => { item.tipo = event.target.value }}>
                <option value="prima edizione">Prima edizione</option>
                <option value="ristampa">Ristampa</option>
                <option value="riedizione">Riedizione</option>
                <option value="sconosciuto">Sconosciuto</option>
              </Form.Control>
              <Form.Label>Anno Da</Form.Label>
              <Form.Control type="text" placeholder="anno da" value={item.anno_da} onChange={(event) => { item.anno_da = event.target.value }} />
              <Form.Label>Anno A</Form.Label>
              <Form.Control type="text" placeholder="anno a" value={item.anno_a} onChange={(event) => { item.anno_a = event.target.value }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Versione</Form.Label>
              <Form.Control type="text" placeholder="versione" value={item.versione} onChange={(event) => { item.versione = event.target.value }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tipografica</Form.Label>
              <Form.Control as="select" value={item.idtipografica} onChange={(event) => { item.idtipografica = event.target.value }}>
                {Array.isArray(tipografiche) && tipografiche.map((tipografica: any, index: any) =>
                (<option key={index} value={tipografica.idtipografica}>{tipografica.nome}</option>))
                }
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Autore</Form.Label>
              <Form.Control as="select" value={item.idillustratore} onChange={(event) => { item.idillustratore = event.target.value }}>
                {Array.isArray(illustratori) && illustratori.map((illustratore: any, index: any) =>
                (<option key={index} value={illustratore.idillustratore}>{illustratore.nome}</option>))
                }
              </Form.Control>
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