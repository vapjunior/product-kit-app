import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.getProducts = this.getProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            products:[],
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {

        this.setState({
            message: "",
        });

        ProductDataService.getAll().then(
            response => {
                this.setState({
                  products: response.data.data.products
                });
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
                });
            }
        )
    }

    deleteProduct(id) {
        
        this.setState({
            message: "",
        });

        ProductDataService.delete(id).then(
            response => {
                this.getProducts();
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
                });
            }
        )

    }

    render() {
        const { products } = this.state;
        return (

            <div className="col-md-10 offset-md-1 col-sm-12 col-xs-12">
                <div className="card card-container">
                <h2>Produtos</h2>
                
                <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                    <a className="btn btn-success" href="/add">Novo Produto</a>
                </div>

                <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.map((product, index) => (
                                <tr key={index}>
                                    <th>{product.id}</th>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.ml_categorie_id}</td>
                                    <td>R$ {product.price}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => this.deleteProduct(product.id)}
                                        >
                                            Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}               
                </div>
            </div>
        );
    }
}
