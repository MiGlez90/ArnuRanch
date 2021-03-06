import React, {Component, Fragment} from 'react';
import {Table, Divider, Button, Modal, message, Switch, Icon, Input} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import MainLoader from "../../common/Main Loader";
import InfoBatch from "./InfoBatch";
import FormGasto from "../animals/FormGasto";
import * as animalGastoActions from "../../../redux/actions/gastoAnimalActions";
import * as lotesActions from '../../../redux/actions/lotesActions';
import {bindActionCreators} from "redux";



const columns = [
    {
        title: 'Arete Rancho',
        dataIndex: 'arete_rancho',
        key:'arete_rancho',
        render: (text, record) => (
                <span>
                  <Link to={`/admin/animals/${record.id}`}>{record.arete_rancho}</Link>
                </span>
        ),

        width:200,
    },{
        title: 'Arete Siniga',
        dataIndex: 'arete_siniga',
        key:'arete_siniga',
        width:150
    },{
        title: 'Propietario',
        dataIndex: 'owner',
        key:'owner',
        width:150
    },{
        title:'Última Pesada',
        dataIndex:'pesadas',
        key:'pesadas',
        render:val=><p>{val.length===0?0:val[val.length-1].peso}Kg</p>,
        width:150
    }];





class BatchDetailPage extends Component {
    state={
        visible:false,
        selectedRowKeys:[],
        loading:false,
        canEdit:false,
        search:'',
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    saveGastos=(gasto)=>{
        this.setState({loading:true});

        let keys = this.state.selectedRowKeys;
        let parcialAmount = gasto.costo/keys.length;
        let parcialQuantity = gasto.cantidad/keys.length;
        for(let i in keys){
            console.log(keys[i]);
            let animalId = keys[i];
            gasto['animal']=animalId;
            gasto['costo']=parcialAmount;
            if(gasto.cantidad)gasto['cantidad']=parcialQuantity;
            let toSend = Object.assign({}, gasto);
            console.log(toSend);
            this.props.animalGastoActions.saveAnimalGasto(toSend)
                .then(r=>{
                    console.log(r)
                }).catch(e=>{
                console.log(e)
            })
        }
        this.setState({loading:false});
        this.handleCancel();
        message.success('Gasto agregado con éxito')
    };
    handleStatus=(status)=>{
        let lote = {};
        lote['id'] = this.props.match.params.id;
        lote['status']=status;
        lote['corral']=null
        //this.props.lotesActions.editLote()
    };
    handleEdit=()=>{
        this.setState({canEdit:!this.state.canEdit})
    };
    edit=()=>{
        this.setState({canEdit:!this.state.canEdit})
    };
    handleSearch=(e)=>{
        this.setState({search:e.target.value})
    };

    render() {
        let {fetched, lote} = this.props;
        let {visible, selectedRowKeys, loading, canEdit, search} = this.state;
        if(!fetched)return(<MainLoader/>);
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const disablebutton = selectedRowKeys.length > 0;
        let regEx = new RegExp(search, "i");
        let animals = lote.animals?lote.animals.filter(a=>regEx.test(a.arete_rancho)||regEx.test(a.arete_siniga)||regEx.test(a.owner)):[];
        return (
            <Fragment>
                <InfoBatch {...lote}
                           canEdit={canEdit}
                           handleEdit={this.handleEdit}
                            edit={this.edit}/>


                {loading?<MainLoader/>:''}
                <Divider/>
                <h4>Aretes de este Lote:</h4>

                <Input.Search

                    onChange={this.handleSearch}
                    value={search}
                    style={{ width: 400 , margin:'1% 0'}}
                    placeholder={'Busca por propietario, arete rancho o arete siniga'}/>

                <Modal title="Agregar nuevo animal"
                       visible={visible}
                       onCancel={this.handleCancel}
                       width={'30%'}
                       maskClosable={true}
                       footer={[
                           null,
                           null,
                       ]}
                >
                    <FormGasto saveGasto={this.saveGastos} handleCancel={this.handleCancel}/>
                </Modal>

                <Table
                    pagination={false}
                    scroll={{x:650, y:500}}
                    rowSelection={rowSelection}
                    columns={columns} dataSource={animals}
                    rowKey={record => record.id}/>
                <Button disabled={!disablebutton} onClick={this.showModal} style={{margin:'1% 0'}}>Agregar Gasto</Button>
            </Fragment>

        );
    }
}


function mapStateToProps (state, ownProps) {
    let loteId = ownProps.match.params.id;
    let lote = state.lotes.list.filter(l => {
        return loteId == l.id;
    });

    lote = lote[0];
    return {
        lote,
        fetched: lote !== undefined
    }
}
 function mapDispatchToProps(dispatch){
     return{
         animalGastoActions:bindActionCreators(animalGastoActions, dispatch),
         lotesActions:bindActionCreators(lotesActions, dispatch),
     }

}





BatchDetailPage = connect(mapStateToProps, mapDispatchToProps)(BatchDetailPage);
export default BatchDetailPage;