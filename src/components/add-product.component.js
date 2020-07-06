import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Axios from "axios";

import ProductDataService from "../services/product.service";


const API_ML = 'https://api.mercadolibre.com';

const required = value => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo é obrigatório!
            </div>
        )
    }
};

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.onChangeCategorie = this.onChangeCategorie.bind(this);
        this.onClearCategorie = this.onClearCategorie.bind(this);

        this.state = {
            id: null,
            name: "",
            description: "",
            price: "",
            ml_categories: "",
            categorie: "",
        };
    }

    componentDidMount(children = false, categorie) {
        if(!children) {
            const ml = Axios.get('https://api.mercadolibre.com//sites/MLB/categories').then(
            response => {

                this.setState({
                    ml_categories: response.data
                })
            },
            error => {
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                console.log(resMessage);
            });
        } else {
            const ml = Axios.get('https://api.mercadolibre.com//categories/'+categorie).then(
            response => {
                if(response.data.children_categories.length !== 0){
                    this.setState({
                        ml_categories: response.data.children_categories,
                    })
                } else {
                    this.setState({
                        categorie: response.data.id
                    })
                }
            },
            error => {
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                console.log(resMessage);
            });
        }
    } 

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangeCategorie(e) {
        this.setState({
            categorie: e.target.value
        });

        this.componentDidMount(true, e.target.value)
    }

    onClearCategorie(e) {
        this.componentDidMount(false, null)
    }

    saveProduct(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        var data = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            ml_categorie_id: this.state.categorie,
        };

        ProductDataService.create(data).then(
            () => {
                this.props.history.push("/products");
                window.location.reload();
            },
            error => {
                const resMessage = 
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: resMessage,
                    loading: false,
                });
            }
        );
    }

    render() {

        return (
            <div className="col-md-8 offset-md-2">
                <div className="card card-container">
                    <Form
                        onSubmit={this.saveProduct}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                validations={[required]}
                            >
                            </Input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <Input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                validations={[required]}
                            >
                            </Input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="categorie">Categoria</label>
                            <select 
                                className="form-control" 
                                id="categorie"
                                onChange={this.onChangeCategorie}
                            >
                            {this.state.ml_categories &&
                                this.state.ml_categories.map((categorie, index) => (
                                    <option key={index} value={categorie.id}>{categorie.name}</option>
                                ))}
                            </select>
                            <a className="btn btn-warning btn-sm"
                                href="#"
                                onClick={() => this.onClearCategorie()}
                            >
                                Trocar Categoria</a>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Preço</label>
                            <Input
                                type="number"
                                min="0"
                                step=".01"
                                className="form-control"
                                id="price"
                                name="price"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                validations={[required]}
                            >
                            </Input>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                            
                            <div className="form-group">
                                <a className="btn btn-danger" href="/products">Voltar</a>
                                <button
                                    className="btn btn-primary"
                                    disabled={this.state.loading}
                                >
                                    <span>Cadastrar</span>
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
