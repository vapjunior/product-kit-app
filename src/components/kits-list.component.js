import React, { Component } from "react";
import KitDataService from "../services/kit.service";
import { Link } from "react-router-dom";

export default class KitList extends Component {
    constructor(props) {
        super(props);
        this.getKits = this.getKits.bind(this);
        this.editKit = this.editKit.bind(this);
        this.deleteKit = this.deleteKit.bind(this);

        this.state = {
            kits:[],
        };
    }

    componentDidMount() {
        this.getKits();
    }

    getKits() {

        this.setState({
            message: "",
        });

        KitDataService.getAll().then(
            response => {
                this.setState({
                  kits: response.data.data.kits
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

    editKit(id) {
        this.props.history.push("/kits/edit"+id);
        window.location.reload();
    }

    deleteKit(id) {
        this.setState({
            message: "",
        });

        KitDataService.delete(id).then(
            response => {
                this.getKits();
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
        const { kits } = this.state;
        return (

            <div className="col-md-10 offset-md-1 col-sm-12 col-xs-12">
                <div className="card card-container">
                <h2>Kits</h2>
                
                <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                    <a className="btn btn-success" href="/kits/add">Novo Kit</a>
                </div>

                <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kits &&
                                kits.map((kit, index) => (
                                <tr key={index}>
                                    <th>{kit.id}</th>
                                    <td>{kit.name}</td>
                                    <td>{kit.description}</td>
                                    <td>{kit.ml_categorie_id}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => this.deleteKit(kit.id)}
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
