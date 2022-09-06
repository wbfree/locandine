import React from "react";
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Image from 'react-bootstrap/Image'
import { FaEye } from "@react-icons/all-files/fa/FaEye";

function ImageTooltip(props) {

	const image_link = props.link;
	
	const renderTooltip = (props) => (
	  <Tooltip id="button-tooltip" {...props}>
	     <Image src={image_link} thumbnail />
	  </Tooltip>
	);

	return (
	  <OverlayTrigger
	    placement="right"
	    delay={{ show: 250, hide: 400 }}
	    overlay={renderTooltip}
	  >

	  	<FaEye/>
	  </OverlayTrigger>
	);  
}  
export default ImageTooltip;
  