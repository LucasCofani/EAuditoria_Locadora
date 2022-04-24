import React, { Component } from "react";
import { variables } from "./Variables";
import { Table, Modal, Button, Input, Space } from 'antd';

const apiURI = 'filme';

export class Filme extends Component {

    constructor(props) {
        super(props);

        this.showModalCreate = this.showModalCreate.bind(this);
        this.showModalEdit = this.showModalEdit.bind(this);
        this.showModalDelete = this.showModalDelete.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
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
                    title: 'Classificacao indicativa',
                    dataIndex: 'classificacaoIndicativa',
                    key: 'id'
                },
                {
                    title: 'lancamento',
                    dataIndex: 'lancamento',
                    key: 'id',
                    render: payload =>{
                        return (
                            <div>{payload === 1 ? 'Sim' : 'Não'}</div>
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
            filme: { id: 0, titulo: '', classificacaoIndicativa: '', lancamento: '' },
        }

    }

    showModalEdit(fil) {
        this.setState({ isModalVisible: true, modalTitle: 'Editar filme', filme: fil, editable: true });
    }
    showModalDelete(fil) {
        this.setState({ isModalVisible: true, modalTitle: 'Deletar filme', filme: fil , editable: false });
    }
    showModalCreate() {
        this.setState({ isModalVisible: true, modalTitle: 'Criar novo filme', filme: { id: 0, titulo: '', classificacaoIndicativa: '', lancamento: '' } , editable: true });
    }
    
    handleOk() {
        this.setState({ isModalVisible: false });
        var typeAction = this.state.modalTitle;
        switch (typeAction) {
            case 'Criar novo filme':
                this.postInfo();
                break;
            case 'Deletar filme':
                if(window.confirm("Deseja mesmo deletar este filme?")){
                    this.deleteInfo();
                }
                break;
            case 'Editar filme':
                this.updateInfo();
                break;
            default:
                console.log("function not found");
        }
    }
    handleCancel() {
        this.setState({ isModalVisible: false });
    }

    changeTitulo = (e) => {
        let fil = this.state.filme;
        fil.titulo = e.target.value;
        this.setState({ filme: fil });
    }
    changeLancamento = (e) => {
        let fil = this.state.filme;
        fil.lancamento = e.target.value;
        this.setState({ filme: fil });
    }
    changeClassi = (e) => {
        let fil = this.state.filme;
        fil.classificacaoIndicativa = e.target.value;
        this.setState({ filme: fil });
    }

    getList() {
        fetch(variables.API_URL + apiURI)
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
                this.state.filme
            )
        })
            .then(res => res.json())
            .then((res) => {
                this.getList();
            });
    }

    updateInfo() {
        fetch(variables.API_URL + apiURI + '/' + this.state.filme.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                this.state.filme
            )
        })
            .then(res => res.json())
            .then((res) => {
                this.getList();
            });
    }

    deleteInfo() {
        fetch(variables.API_URL + apiURI + '/' + this.state.filme.id, {
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
            filmes,
            columns,
            isModalVisible,
            modalTitle,
            editable,
            handleOk,
            handleCancel,
            filme
        } = this.state;
        
        return (
            <div>
                <Space>
                    <h1>Filme</h1>
                    <Button type="primary" onClick={this.showModalCreate}>
                        Adicionar
                    </Button>
                </Space>
                <br />
                <br />
                <Table dataSource={filmes} columns={columns} />
                <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Space direction="vertical">
                        <Input disabled={!editable} addonBefore="Titulo" placeholder="Ex: Wall-E" value={filme.titulo} onChange={this.changeTitulo} />
                        <Input disabled={!editable} addonBefore="Classificacao indicativa" placeholder="Ex: 12345678912" value={filme.classificacaoIndicativa} onChange={this.changeClassi} />
                        <Input disabled={!editable} addonBefore="Lançamento" placeholder="Ex: 0" value={filme.lancamento} onChange={this.changeLancamento} />
                    </Space>
                </Modal>
            </div>
        )
    }
}