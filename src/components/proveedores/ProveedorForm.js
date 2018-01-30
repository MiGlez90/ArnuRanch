import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Input, Button, } from 'antd';


const FormItem = Form.Item;
const TextArea = Input;
const InputGroup = Input.Group;

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

class ProveedorForm extends Component {
    state = {
        value: '',
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                this.props.saveProveedor(values)

            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <Form onSubmit={this.handleSubmit} >
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap' }}>
                    <FormItem
                        label="Nombre del Proveedor"
                    >
                        {getFieldDecorator('provider', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Dirección"
                    >
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Correo electrónico"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Teléfono"
                    >
                        {getFieldDecorator('phone_number', {
                            rules: [{
                                required: true, message: 'Completa el campo!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>



                </div>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" style={{borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                        Guardar
                    </Button>
                </FormItem>



            </Form>

        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = () => ({

});

const FormProveedor = Form.create()(ProveedorForm);

ProveedorForm = connect(mapStateToProps, mapDispatchToProps)(ProveedorForm);
export default FormProveedor;