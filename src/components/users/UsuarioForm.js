import React from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';


const FormItem = Form.Item;

const styles = {
    form:{
        display:'flex',flexDirection:'column', justifyContent:'space-around', flexWrap:'wrap'

    },
    formSection:{
        display:'flex',flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'
    },
    sectionCheck:{
        display:'flex',justifyContent:'flex-end', flexWrap:'wrap'
    },
    buttonSave:{
        borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'
    }
};


const UsuarioForm = Form.create()(
    (props) => {
        const{visible, onCancel, onCreate, form, options_permisos } = props;
        const{getFieldDecorator} = form;


        return(
            <Modal
                visible={visible}
                title={"Nuevo Usuario"}
                onCancel={onCancel}
                width={'30%'}
                maskClosable={true}
                footer={[
                    null,
                    null,
                ]}
            >
                <Form onSubmit={this.handleSubmit} >
                    <div style={styles.form}>
                        <FormItem
                            label="Usuario"
                        >
                            {getFieldDecorator('user_name', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Contraseña"
                        >
                            {getFieldDecorator('user_pass', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label={"Permiso"}
                        >
                            {getFieldDecorator('permiso', {
                                rules: [{
                                    required: true, message: 'Completa el campo!',
                                }],

                            })(


                                <Select  placeholder={"Selecciona un Permiso"}>
                                    {options_permisos}
                                </Select>
                            )}

                        </FormItem>





                    </div>
                    <FormItem>
                        <Button type="primary" onClick={onCreate} size="large" style={{borderColor:'#72c6cd', backgroundColor:'#72c6cd', display:'flex', justifyContent:'center', margin:'0 auto', width:'100%'}}>
                            Guardar
                        </Button>
                    </FormItem>



                </Form>

            </Modal>

        )
    }
);

export default UsuarioForm;
