import React, { Component } from "react";
import { variables } from "./Variables";
import { Table, Modal, Button, Input, Space } from 'antd';

const apiURI = 'relatorio';

export class Relatorio extends Component {

    constructor(props) {
        super(props);


        this.state = {
            clientesAtrasados: [],
            clientesTop: [],
            filmesSemana: [],
            filmesAno: [],
            filmesNunca: [],
            columnsCliente: [
                {
                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id'
                },
                {
                    title: 'Nome',
                    dataIndex: 'nome',
                    key: 'id'
                },
                {
                    title: 'CPF',
                    dataIndex: 'cpf',
                    key: 'id'
                },
                {
                    title: 'Data Nascimento',
                    dataIndex: 'dataNascimento',
                    key: 'id'
                }
            ],
            columnsFilme: [
                {
                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id'
                },
                {
                    title: 'Titulo',
                    dataIndex: 'titulo',
                    key: 'id'
                },
                {
                    title: 'Classificacao indicativa',
                    dataIndex: 'classificacaoIndicativa',
                    key: 'id'
                },
                {
                    title: 'Lançamento',
                    dataIndex: 'lancamento',
                    key: 'id',
                    render: payload =>{
                        return (
                            <div>{payload === 1 ? 'Sim' : 'Não'}</div>
                        )
                    }
                }
            ],
        }

    }

    getList() {
        fetch(variables.API_URL + apiURI + '/' + "atrasados")
            .then(res => res.json())
            .then(data => {
                this.setState({ clientesAtrasados: data.info });
            });
        
        fetch(variables.API_URL + apiURI + '/' + "topclientesaluguel")
            .then(res => res.json())
            .then(data => {
                this.setState({ clientesTop: data.info });
            });
        
        fetch(variables.API_URL + apiURI + '/' + "bottomsemanaalugados")
            .then(res => res.json())
            .then(data => {
                this.setState({ filmesSemana: data.info });
            });
        
        fetch(variables.API_URL + apiURI + '/' + "topanoalugados")
            .then(res => res.json())
            .then(data => {
                this.setState({ filmesAno: data.info });
            });
        
        fetch(variables.API_URL + apiURI + '/' + "naoalugados")
            .then(res => res.json())
            .then(data => {
                this.setState({ filmesNunca: data.info });
            });
    }


    componentDidMount() {
        this.getList();
    }

    render() {
        const {
            columnsCliente,
            columnsFilme,
            clientesAtrasados,
            clientesTop,
            filmesSemana,
            filmesAno,
            filmesNunca,
        } = this.state;
        
        return (
            <div>
                <Space>
                    <h1>Relatorios</h1>
                </Space>
                <br />
                <br />
                <Space direction="vertical">
                    <h1>Atrasados</h1>
                    <Table dataSource={clientesAtrasados} columns={columnsCliente} />

                    <h1>Top Clientes</h1>
                    <Table dataSource={clientesTop} columns={columnsCliente} />

                    <h1>Filmes menos alugados da semana</h1>
                    <Table dataSource={filmesSemana} columns={columnsFilme} />

                    <h1>Filmes mais alugados no ultimo ano</h1>
                    <Table dataSource={filmesAno} columns={columnsFilme} />

                    <h1>Filmes nunca alugados</h1>
                    <Table dataSource={filmesNunca} columns={columnsFilme} />
                </Space>
            </div>
        )
    }
}