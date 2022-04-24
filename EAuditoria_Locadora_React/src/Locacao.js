import React, { Component } from "react";
import { variables } from "./Variables";
import { Table, Modal, Button, Input, Space, Select } from 'antd';

const apiURI = 'locacao';

export class Locacao extends Component {

    constructor(props) {
        super(props);

        this.showModalCreate = this.showModalCreate.bind(this);
        this.showModalEdit = this.showModalEdit.bind(this);
        this.showModalDelete = this.showModalDelete.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            locacoes: [],
            clientes: [],
            filmes: [],
            isModalVisible: false,
            setIsModalVisible: false,
            editable: true,
            columns: [
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
                    title: 'Nome do cliente',
                    dataIndex: 'nome',
                    key: 'id'
                },
                {
                    title: 'Data de locação',
                    dataIndex: 'dataLocacao',
                    key: 'id'
                },
                {
                    title: 'Data de devolução',
                    dataIndex: 'dataDevolucao',
                    key: 'id'
                },
                {
                    title: 'Em atraso',
                    dataIndex: 'atrasado',
                    key: 'id',
                    render: payload=>{
                        return (
                        <p>{payload==1?"Sim":"Não"}</p>
                        )
                    }
                },
                {
                    title: 'Ações',
                    key: 'id',
                    render: payload => {
                        return (
                            <Space>
                                <Button type="primary" onClick={() => { this.showModalEdit(payload) }}>
                                    Edit
                                </Button>
                                <Button type="primary" onClick={() => { this.showModalDelete(payload) }}>
                                    Delete
                                </Button>
                            </Space>
                        )
                    }
                },
            ],
            modalTitle: '',
            handleOk: this.handleOk,
            handleCancel: this.handleCancel,
            locacao: { id: 0, id_Cliente: '', id_Filme: '', dataLocacao: '', dataDevolucao: '', titulo: '', nome: '' },
        }

    }

    showModalEdit(loc) {
        this.setState({ isModalVisible: true, modalTitle: 'Editar locação', locacao: loc, editable: true });
    }
    showModalDelete(loc) {
        this.setState({ isModalVisible: true, modalTitle: 'Deletar locação', locacao: loc, editable: false });
    }
    showModalCreate() {
        this.setState({ isModalVisible: true, modalTitle: 'Criar nova locação', locacao: { id: 0, id_Cliente: '', id_Filme: '', dataLocacao: '', dataDevolucao: '', titulo: '', nome: '' }, editable: true });
    }

    handleOk() {
        this.setState({ isModalVisible: false });
        var typeAction = this.state.modalTitle;
        switch (typeAction) {
            case 'Criar nova locação':
                this.postInfo();
                break;
            case 'Deletar locação':
                if (window.confirm("Deseja mesmo deletar esta locação?")) {
                    this.deleteInfo();
                }
                break;
            case 'Editar locação':
                this.updateInfo();
                break;
            default:
                console.log("function not found");
        }
    }
    handleCancel() {
        this.setState({ isModalVisible: false });
    }

    changeCliente = (e) => {
        console.log(e);
        let loc = this.state.locacao;
        loc.id_Cliente = e;
        this.setState({ locacao: loc });
        console.log("ChengeCliente: " + JSON.stringify(loc));
    }

    changeFilme = (e) => {
        console.log(e);
        let loc = this.state.locacao;
        loc.id_Filme = e;
        this.setState({ locacao: loc });
        console.log("ChengeFilme: " + JSON.stringify(loc));
    }

    changeDataLocacao = (e) => {
        let loc = this.state.locacao;
        loc.dataLocacao = e.target.value;
        this.setState({ locacao: loc });
        console.log("ChengeLocacao: " + JSON.stringify(loc));
    }

    changeDataDevolucao = (e) => {
        let loc = this.state.locacao;
        loc.dataDevolucao = e.target.value;
        this.setState({ locacao: loc });
        console.log("ChengeDevolucao: " + JSON.stringify(loc));
    }

    getList() {
        fetch(variables.API_URL + apiURI)
            .then(res => res.json())
            .then(data => {
                let temp = data.info;
                temp.forEach(element => {
                    element.nome = element.cliente.nome;
                    element.titulo = element.filme.titulo;
                });
                this.setState({ locacoes: temp });
            });

        fetch(variables.API_URL + 'cliente')
            .then(res => res.json())
            .then(data => {
                this.setState({ clientes: data.info });
            });

        fetch(variables.API_URL + 'filme')
            .then(res => res.json())
            .then(data => {
                this.setState({ filmes: data.info });
            });
    }

    postInfo() {
        fetch(variables.API_URL + apiURI, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                this.state.locacao
            )
        })
            .then(res => res.json())
            .then((res) => {
                this.getList();
            });
    }

    updateInfo() {
        let temp = this.state.locacao;
        temp.filme = null;
        temp.cliente = null;
        fetch(variables.API_URL + apiURI + '/' + this.state.locacao.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                temp
            )
        })
            .then(res => res.json())
            .then((res) => {
                this.getList();
            });
    }

    deleteInfo() {
        fetch(variables.API_URL + apiURI + '/' + this.state.locacao.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((res) => {
                this.getList();
            });
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        const {
            locacoes,
            filmes,
            clientes,
            columns,
            isModalVisible,
            modalTitle,
            editable,
            handleOk,
            handleCancel,
            locacao
        } = this.state;

        return (
            <div>
                <Space>
                    <h1>Locacao</h1>
                    <Button type="primary" onClick={this.showModalCreate}>
                        Adicionar
                    </Button>
                </Space>
                <br />
                <br />
                <Table dataSource={locacoes} columns={columns} />
                <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Space direction="vertical">
                        <Space>
                            Cliente:
                            <Select disabled={!editable} placeholder="Nome do cliente" style={{ width: 120 }} defaultValue={locacao.id_Cliente} onChange={this.changeCliente}>
                                {clientes.map(p => {
                                    return <Select.Option key={p.id} value={p.id} >{p.nome}</Select.Option>
                                })}
                            </Select>
                        </Space>
                        <Space>
                            Filme:
                            <Select disabled={!editable} placeholder="Titulo alugado" style={{ width: 120 }} defaultValue={locacao.id_Filme} onChange={this.changeFilme}>
                                {filmes.map(p => {
                                    return <Select.Option key={p.id} value={p.id} >{p.titulo}</Select.Option>
                                })}
                            </Select>
                        </Space>
                        <Input disabled={!editable} addonBefore="Data locação" placeholder="Ex: 2022-04-01" value={locacao.dataLocacao} onChange={this.changeDataLocacao} />
                        <Input disabled={!editable} addonBefore="Data Devolução" placeholder="Ex: 2022-04-01" value={locacao.dataDevolucao} onChange={this.changeDataDevolucao} />
                    </Space>
                </Modal>
            </div>
        )
    }
}