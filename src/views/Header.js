import React, {useState , useEffect} from "react";
import {   Collapse,
  Navbar,
  NavbarToggler,
   NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  //  NavbarText
 } from "reactstrap";
import '../style/header.css'
import Slider from "react-slick";
import {Link} from 'react-router-dom'
// import img from '../images/nfl.jpg';
import {logout , loadUser} from '../redux/actions/authAction';
// import banner1 from '../images/banner1.jpg';
// import banner2 from '../images/banner2.png';
// import banner3 from '../images/banner3.jpg';
import {connect} from 'react-redux';
import logo from '../images/app_logo.png';
import logOutIcon from '../images/sign-in-alt-solid.svg';
import '../style/responsive.css';
import {getBanners} from '../redux/actions/ManageBannerAction';
 function Header(props) {

  const settings = {
    dots: false,
    // speed: 200,
    infinite: true,
    autoplay: true,
    speed: 18000,
    autoplaySpeed:1500,
    slidesToShow:1,
    focusOnSelect:true,
    arrows : false,
    
    //  nextArrow: <SampleNextArrow />,
    //  prevArrow: <SamplePreArrow />
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
 
useEffect(() => {
  props.getBanners()
  const token = {
    headers:{
    'Authorization': 'Bearer ' +props.auth.token,
   'Accept': 'application/json'
    }
  }
// props.loadUser(token)
}, [])
//  console.log('banners', props.banners)

  return (
    <div className="themed-container"  >
      <div>
      <Navbar color="light" light expand="md" id="navBrr">
        <NavbarBrand href="/"><img src={logo} alt="logo" id="handelLogo" style={{width:200}}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar  style={{float:'left'}} id="handelNav">
          <Nav className="mr-auto" navbar >
          <DropdownItem divider />
            <NavItem>
            <NavLink  id="headerNav"><Link to="/" id="headerNav">Home</Link></NavLink>
            </NavItem>
            <DropdownItem divider />
            <NavItem>
              <NavLink   className="headerNav"><Link to="/bonuses" id="headerNav">Bonuses</Link> </NavLink>
            </NavItem>
            <DropdownItem divider />
            <NavItem >
              <NavLink  className="headerNav"><Link to="/articles" id="headerNav">Articles </Link></NavLink>
            </NavItem>
            <DropdownItem divider />
             <NavItem>
              <NavLink className="headerNav" > <Link to="/spreadsheet" id="headerNav"> Spreadsheet </Link></NavLink>
            </NavItem> 
            <DropdownItem divider />
            { props.auth.type == "1"   ?   
          <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret id="headerNav" className="headerNav">
                Admin
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem >
                <Link to="/bets" id="headerNav"> Manage Bets</Link> 
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
               <Link to="/articles" id="headerNav"> Manage Articles</Link>  
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                <Link to="/bonuses" id="headerNav"> Manage Bonuses</Link>    
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                <Link to="/bookies" id="headerNav">Manage Bookies</Link>     
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                <Link to="/sports" id="headerNav">Manage Sports</Link>   
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem >
                <Link to="/leagues" id="headerNav">Manage Leagues</Link>    
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <Link to="/banners" id="headerNav">Manage Banners</Link>   
                </DropdownItem>
              </DropdownMenu>
          </UncontrolledDropdown> 
             : null} 
          <DropdownItem divider />
          
            {props.auth.token === null ? (
            <div style={{ pointer: "curser", color: "white" }}>
              {/* <i  class="fa fa-sign-out-alt"></i> */}
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink>
                {/* <i class="fa fa-sign-out-alt"></i> */}
              <img id="loginLogo" src={logOutIcon} style={{width:16, marginTop:-4 }} alt="logout"/>
                     <Link to="/login" id="headerNav">  login    </Link>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          ) : (
            <Nav>
            <UncontrolledDropdown nav inNavbar>
               <DropdownToggle nav caret style={{color:'#38d39f'}}>
                {props.auth.user === null ? null :props.auth.user}
              
              </DropdownToggle> 
              <DropdownMenu right> 
                <DropdownItem  >
                  <Link id="headerNav"  onClick={props.logout}>
                       Sign out
                  </Link>
                </DropdownItem>
          
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
           
          )}
          </Nav>
        
        </Collapse>
      </Navbar>
    </div>
 
      <div className="container" style={{ marginBottom:20}} >
        
          <Slider {...settings} className="handelSlider">
            {props.banners.map((item)=>{
              return <img  src={item.banner} alt="banners"/> 
            })}

    
      </Slider>  
        </div>
       
    </div>
  );
}
const mapDispatchToProps = dispatch =>{
  return {
    logout : () => dispatch(logout()),
    loadUser: (data) => dispatch(loadUser(data)),
    getBanners: ()=> dispatch(getBanners()),
  }
}
const mapStateToProps = store =>{
  return {
    auth:store.auth,
    banners :store.bannerReducer.banners
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);