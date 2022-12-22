/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function AnnuncioEdit(props: any) {

    const [show, setShow] = useState<boolean>(false);
    const [idedizione, setIdEdizione] = useState<any>();

    const idimage = props.idimage;
    console.log(props.edizioni);

    const handleClose = () => setShow(false);
    const url = 'https://balinona.synology.me/locandine_backend/api.php?table=_images&id=' + idimage;

    const handleShow = () => {
        setShow(true)
    }

    const handleSubmit = () => {
        // Simple POST request with a JSON body using fetch
        setShow(false);
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idimage: idimage, idedizione: idedizione })
        };
        fetch(url, postOptions)
            .then(response => response.json())
            .then(data => props.onReload());
    }

    return (
        <>
            {idimage > 0 && <Button variant="primary" onClick={handleShow}>Edit</Button>}&nbsp;

            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit edizione {idimage}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Edizioni</Form.Label>
                            <Form.Control as="select" value={idedizione} onChange={(event) => { setIdEdizione(event.target.value) }}>
                                {Array.isArray(props.edizioni) && props.edizioni.map((edizione: any, index: any) =>
                                    (<option key={index} value={edizione.idedizione}>{edizione.edizione}</option>))
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

export default AnnuncioEdit;