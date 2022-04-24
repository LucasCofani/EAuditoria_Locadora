import React, { Component } from "react";
import { variables } from "./Variables";
import { Table, Modal, Button, Input, Space } from 'antd';

const apiURI = 'cliente';

export class Cliente extends Component {

    constructor(props) {
        super(props);

        this.showModalCreate = this.showModalCreate.bind(this);
        this.showModalEdit = this.showModalEdit.bind(this);
        this.showModalDelete = this.showModalDelete.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            clientes: [],
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
            cliente: { id: 0, nome: '', cpf: '', dataNascimento: '' },
        }

    }

    showModalEdit(cli) {
        this.setState({ isModalVisible: true, modalTitle: 'Editar cliente', cliente: cli, editable: true });
    }
    showModalDelete(cli) {
        this.setState({ isModalVisible: true, modalTitle: 'Deletar cliente', cliente: cli , editable: false });
    }
    showModalCreate() {
        this.setState({ isModalVisible: true, modalTitle: 'Criar novo cliente', cliente: { id: 0, nome: '', cpf: '', dataNascimento: '' } , editable: true });
    }

    handleOk() {
        this.setState({ isModalVisible: false });
        var typeAction = this.state.modalTitle;
        switch (typeAction) {
            case 'Criar novo cliente':
                this.postInfo();
                break;
            case 'Deletar cliente':
                if(window.confirm("Deseja mesmo deletar este cliente?")){
                    this.deleteInfo();
                }
                break;
            case 'Editar cliente':
                this.updateInfo();
                break;
            default:
                console.log("function not found");
        }
        this.setState({ cliente: { id: 0, nome: '', cpf: '', dataNascimento: '' } });
    }
    handleCancel() {
        this.setState({ isModalVisible: false ,cliente: { id: 0, nome: '', cpf: '', dataNascimento: '' } });
    }

    changeName = (e) => {
        let cli = this.state.cliente;
        cli.nome = e.target.value;
        this.setState({ cliente: cli });
    }
    changeCPF = (e) => {
        let cli = this.state.cliente;
        cli.cpf = e.target.value;
        this.setState({ cliente: cli });
    }
    changeData = (e) => {
        let cli = this.state.cliente;
        cli.dataNascimento = e.target.value;
        this.setState({ cliente: cli });
    }

    getList() {
        fetch(variables.API_URL + apiURI)
            .then(res => res.json())
            .then(data => {
                this.setState({ clientes: data.info });
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
                this.state.cliente
            )
        })
            .then(res => res.json())
            .then((res) => {
                this.getList();
            });
    }

    updateInfo() {
        fetch(variables.API_URL + apiURI + '/' + this.state.cliente.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                this.state.cliente
            )
        })
            .then(res => res.json())
            .then((res) => {
                this.getList();
            });
    }

    deleteInfo() {
        fetch(variables.API_URL + apiURI + '/' + this.state.cliente.id, {
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
            clientes,
            columns,
            isModalVisible,
            modalTitle,
            editable,
            handleOk,
            handleCancel,
            cliente
        } = this.state;
        
        return (
            <div>
                <Space>
                    <h1>Clientes</h1>
                    <Button type="primary" onClick={this.showModalCreate}>
                        Adicionar
                    </Button>
                </Space>
                <br />
                <br />
                <Table dataSource={clientes} columns={columns} />
                <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Space direction="vertical">
                        <Input disabled={!editable} addonBefore="Nome" placeholder="Ex: Ada" value={cliente.nome} onChange={this.changeName} />
                        <Input disabled={!editable} addonBefore="CPF" placeholder="Ex: 12345678912" value={cliente.cpf} onChange={this.changeCPF} />
                        <Input disabled={!editable} addonBefore="Data de nascimento" placeholder="Ex: 2022-04-01" value={cliente.dataNascimento} onChange={this.changeData} />
                    </Space>
                </Modal>
            </div>
        )
    }
}