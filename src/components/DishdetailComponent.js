import React , { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
     Button, Modal, ModalHeader, ModalBody,
     Form, FormGroup, Input, Label, Col, Row
} from 'reactstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
            rating:1,
            author:'',
            comment:'',
            touched:{
                author:false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);

    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    handleChange(event) {
        this.setState({rating: event.target.value});

      }
    handleNameChange(event){
        this.setState({author:event.target.value});
    }
    handleCommentChange(event){
        this.setState({comment:event.target.value});
    }
    handleSubmit(values) {
        this.toggleModal();
        const{
            rating,
            author,
            comment
        }=this.state
        alert('Current State is: ' + JSON.stringify(this.state));
        this.props.postComment(this.props.dishId, this.state.rating, this.state.author, this.state.comment);
        // event.preventDefault();
    }
    validate(author) {
        const errors = {
            author: '',
        };

        if (this.state.touched.author && author.length < 3)
            errors.author = 'Must be greater than 2 characters';
        else if (this.state.touched.author && author.length > 15)
            errors.author = 'Must be 15 characters or less';

        return errors;
    }

      render(){
        const errors = this.validate(this.state.author);

        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        
            return(
                <div>
                     <Button outline onClick={this.toggleModal}><i className="fa fa-pencil"></i> Submit Comment</Button>
                      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={(values)=>this.handleSubmit(values)}>
                                <FormGroup>
                                    <Label htmlFor="rating">Rating</Label>
                                        <Input type="select" value={this.state.rating} onChange={this.handleChange}>
                                        <option selected value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name"
                                        placeholder="Your Name"
                                        value={this.state.author}
                                        onChange={this.handleNameChange}
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </FormGroup>
                                <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" rows="6" id="exampleText" value={this.state.comment} onChange={this.handleCommentChange}/>
                
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Form>
                          </ModalBody>
                    </Modal>
                </div>
            );
        }
      

}

function RenderDish({dish}) {
    if (dish != null) 
        return (
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
        );
     else 
        return (
            <div></div>
        );
    

}


function RenderComments({comments, postComment, dishId}) {
    if (comments != null) {
        return (
            <div>
                <h4>Comments</h4>
                <Stagger in>
                {comments.map((comment) => {
                            return (
                                <Fade in className="list-unstyled">
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
            </Stagger>

           <CommentForm dishId={dishId} postComment={postComment} />

            </div>

        );
    } else {
        return (
            <div></div>
        );

    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                />    
                </div>
            </div>
        
            </div>
            
        );
    } else {
        return (
            <div></div>
        );
    }

}


export default DishDetail;
