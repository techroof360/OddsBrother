import React , {useEffect, useState} from 'react';
import Header from './Header';
import artical from '../images/articals.jpg';

import {
    // Modal,
    // ModalHeader,
    // ModalBody,
    // ModalFooter,
    Container,
    // Row,
    // Col,
    // Alert, 
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, 
    // Form,
    // FormGroup,
    // Label,
    // Input
  } from "reactstrap";
import Footer from "./footer";
import { connect } from 'react-redux';

 function ShowArtical(props) {
  const [state, setState] = useState({
    Articals:[]
    //  Articals = [
    //   {heading:'Oddstips: Belarus Handball Division 2',
    //    oddsText:"april 1st, 2020|Category Name|0 Comments",
        
    //    category:"16:30 Meshkov II - Rguor We are in a hard time this moment but some competition is still playing like Belarus handball. First of all, I need to inform you that I don’t [...]"},

    // ]
  })
useEffect(()=>{
   let { id } = props.match.params;
  const CurrentPost = props.artical.filter((item)=>{
    return item.id == id
  });
setState((state)=>({
  ...state,Articals: CurrentPost
}))

}, [props.artical])

    return (
        <div>
            <Header/>
           <Container>
           <div >
            {state.Articals.length> 0 && state.Articals.map((item, i)=>{
          return   <Card key={i} >
              <CardImg top width="100%" height="500px" src={item.image} alt="Articals"  />
              <CardBody>
              <CardTitle style={{fontWeight:'bold'}}>{item.heading}</CardTitle>
              <CardSubtitle style={{fontSize:10}}>{item.oddsText}</CardSubtitle>
              <CardText style={{fontSize:12 , color:'#282c35'}} className="cat"> {
                setTimeout(()=>{
                    document.getElementsByClassName("cat").item(i).innerHTML = item.category 
                }, 500)
              } </CardText>
              </CardBody>
            </Card>
           })} 
          </div>
           </Container>
           <Footer/>
        </div>
    )
}
const mapStateToProps = store =>{
  return {
    artical : store.articalReducer.articals,
    auth:store.auth
  }
}

export default connect(mapStateToProps, null)(ShowArtical)