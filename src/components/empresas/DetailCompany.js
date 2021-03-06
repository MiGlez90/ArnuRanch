import React, {Component} from 'react';
import {Card, Select, Divider} from 'antd';
import * as empresaActions from '../../redux/actions/empresasActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import MainLoader from "../common/Main Loader";
import InfoCompany from './InfoCompany';

import moment from 'moment';

const Option = Select.Option;

const opciones = [{
    name :'Cerdos',
    id: 1
},
    {
        name:'Ganado',
        id:2
    },
    {
        name:'Granos',
        id:3
    },
    {
        name:'Planta de alimentos',
        id:4
    },
    {
        name:'Campo',
        id:5
    },

];

class DetailCompany extends Component{
    state={
        editMode:false,

    };

    handleEditMode=()=>{
        this.setState({editMode:!this.state.editMode})
    };

    checkRfc = (rule, value, callback) => {
        if (value === undefined) {
            callback('Verifica el RFC ingresado');
        } else {
            if(value.length < 13){
                callback('Recuerda que son trece dígitos');
            }
            callback()
        }
    };

    checkPhone = (rule, value, callback) => {
        if (value === undefined) {
            callback('El número ingresa debe contener 10 dígitos.');
        } else {
            if(value.length < 10){
                callback('Ingresa un número de 10 dígitos');
            }
            callback()
        }
    };


    render(){
        let {empresa, fetched} = this.props;
        let {editMode} = this.state;
        if(!fetched)return(<MainLoader/>);
        let options = opciones.map(o => <Option title={o.name} value={o.name} key={o.id}>{o.name}</Option>);
        return(
            <div>
                <div style={{marginBottom:10, color:'rgba(0, 0, 0, 0.65)' }}>
                    Administración
                    <Divider type="vertical" />
                    <Link to={`/admin/empresas/`} style={{color:'black'}} >Empresas</Link>
                    <Divider type="vertical" />
                    Empresa {empresa.id}
                </div>

                <div style={{width:'30%', margin: '0 auto'}}>
                    <Card title={"Detalle"}>
                        <span style={{textAlign:'center', display:'inherit', marginBottom:10}}><strong>Fecha de Registro: </strong>{moment(empresa.created).format('LL')}</span>
                        <InfoCompany
                            {...empresa}
                            editEmpresa={this.props.empresaActions.editEmpresa}
                            handleEditMode={this.handleEditMode}
                            editMode={editMode}
                            options={options}
                            rfcR={this.checkRfc}
                            phone={this.checkPhone}

                        />
                    </Card>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.em;
    let empresa = state.empresas.list.filter(a=>{
        return id == a.id;
    });
    empresa = empresa[0];
    return {
        empresa,
        fetched: empresa!==undefined && state.empresas.list!==undefined,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        empresaActions: bindActionCreators(empresaActions, dispatch),
    }
}

DetailCompany = connect(mapStateToProps, mapDispatchToProps ) (DetailCompany);
export default DetailCompany;