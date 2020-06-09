import React, { useState, useEffect } from "react";

import { CustomInput, FormGroup,Label,Input,Button,Modal,Form,ModalHeader, ModalBody,ModalFooter,Container,Row,Col,Alert} from "reactstrap";

export default function Test() {
    const [formData, setFormDate] = useState({
        description: "",
      });
      const onChange = e => {
        setFormDate({...formData, [e.target.name]:e.target.value})
      };

    return (
        <div>
             <FormGroup>
                      <Label for="exampleText">Description</Label>
                    
                      <Input
                        type="textarea"
                        name="description"
                        id="exampleText"
                          value={formData.description}
                        onChange={e=>onChange(e)}
                      />
          
           
                    </FormGroup>
        </div>
    )
}
