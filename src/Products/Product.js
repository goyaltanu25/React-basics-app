import React , {Component} from 'react'
import {connect} from "react-redux";
import './Product.css'
import ProductList from '../ProductList/ProductList'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import PortalModal  from "../Modal/Modalpopup"
import Sidebar from '../Sidebar/Sidebar'
import ViewDetailpopup from '../Modal/ViewDetailpopup'
import { Row,Col,Container, Button ,Form,Navbar } from "react-bootstrap"


class Products extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
     items :  [
        {  
          "id": 1,
          "ProductName": "Item 1",
          "Price" : "$100",
          "Description": "Description of item 1"
        },
        {
          "id": 2,
          "ProductName": "Item 2",
          "Price" : "$400",
          "Description": "Description of item 2"
        },
        {
          "id": 3,
          "ProductName": "Item 3",
          "Price" : "$600",
          "Description": "Description of item 3"
        },
        {
          "id": 4,
          "ProductName": "Item 4",
          "Price" : "$800",
          "Description": "Description of item 4"
        }
      ],
      showModal: false,
      isEnabled: true,
      showProducts: false,
      showViewModal: false,
    };
  }

  
  addItem = (e) =>{
     e.preventDefault();
     this.handleCloseModal();
     const items = Object.assign([] , this.state.items) ;
     if(this.refs.prdName.value && this.refs.price.value && 
      this.refs.description.value !== ""){
       const newId = items[items.length-1].id + 1;
        this.setState({
        items: items.concat({
        id:newId,
        ProductName:this.refs.prdName.value,
        Price : `$${this.refs.price.value}`,
        Description: this.refs.description.value
      })
 }) }
  }

  
handleDelete = (id,e) =>{
  const filteredItems= this.state.items.filter(item =>
    item.id!==id);
   this.setState({
     items:filteredItems
})
  
}

handleView= (id,e) =>{
  const filteredItems= this.state.items.filter(item =>
  item.id!==id);
  console.log('view details', id);
  this.setState({showViewModal: !this.state.showViewModal})


}

showValue = (e) =>{
  if ( this.refs.prdName.length < 0 && this.refs.description.value<0 && this.refs.price.value<0 ){
     document.getElementById("submitbtn").disable = true
  }
}


handleShowMessageClick = () => this.setState({showModal: true})
handleCloseModal = () => this.setState({showModal: false})
handleProductList = () => this.setState({showProducts: !this.state.showProducts})

render(){
  let itemLength = this.state.items.length;
      return (
        <ErrorBoundary>
          <Navbar bg="dark" className="justify-content-between" style={{padding:'20px'}}>
        <Navbar.Brand style={{color:"white"}}>
          <span>{this.state.loginData}</span>
        </Navbar.Brand>
       </Navbar>
        <Container style={{ marginTop:'15px'}}>
        <Row>
        <Col  md={2}> 
        <Sidebar length={itemLength} add={this.handleShowMessageClick} close={this.handleProductList}/>
        
        {this.state.showModal ? (
            <PortalModal>
             <Form onSubmit={this.addItem}>
             <Button className = "closebtn" onClick={this.handleCloseModal}>X </Button>
              <div className="hdng"> Add Product </div> 
              <hr/>
              <Form.Group controlId="itemName">
             <Form.Label>Item Name :</Form.Label>
             <Form.Control required ref="prdName" type="text" placeholder="Enter ProductName" value= {this.state.items.ProductName} />
            </Form.Group>
           <Form.Group controlId="itemPrice">
         <Form.Label>Price :</Form.Label>
         <Form.Control required ref="price" type="number" min="100" max="1000" placeholder="Enter Price " value= {this.state.items.Price} />
        </Form.Group>
       <Form.Group controlId="itemDescription">
      <Form.Label>Description :</Form.Label>
       <Form.Control required ref="description"  type="text" placeholder="Enter Description" value= {this.state.items.Description} />
      </Form.Group>
     </Form>
     <Button  type="submit" id="submitbtn"  variant="primary" onClick= {this.addItem} >
              Add
     </Button>
          </PortalModal>
          ) : null}
      </Col>
      <Col  md={10}>
      <Row>
       {this.state.showViewModal ? (
         <ViewDetailpopup>
             <Form>
                <div className="modal-header">
                    <h4>Product Details</h4>
                    <Button className="closebtn" onClick={this.handleView}>X</Button>
                </div>
                <div className="modal-content">
                <h1>hello world</h1>
                </div>
            </Form >
         </ViewDetailpopup>
       ): null
       }
     
        { this.state.showProducts ?(
             this.state.items.map((productList,index)=>{
                return( 
                <ProductList key={productList.id} 
                id = {productList.id}
                productName={productList.ProductName} 
                viewDetails={this.handleView}
                deleteItem = {this.handleDelete}>
                  <h5>{productList.Price}</h5>
                  <h6> {productList.Description}</h6>
                </ProductList>
                  )
             })
        ):null
          } 
           
          </Row> 
        </Col> 
        </Row>
        </Container>
        </ErrorBoundary>
      )

    }


  }
  const mapStateToProps = (state) =>{
    return {
     loginData: state.loginData,
     
    }
  } 
  
export default connect(mapStateToProps)(Products);