import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import AdminHeader from "../Admin/AdminHeader";
import Footer from "../Miscellanous/Footer";
import { url } from '../Config_url'
import { Button, Modal, Form, Input, Radio } from 'antd';
import 'antd/dist/antd.css';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="New Expense"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="Expense Title">
                            {getFieldDecorator('expensetitle')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="Expense Description">
                            {getFieldDecorator('expensedescription')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="Expense Time">
                            {getFieldDecorator('expensetime')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="Expense Amount">
                            {getFieldDecorator('expenseamount')(<Input type="textarea" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            successFlag: false
        };


    }

    //add_expense

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };


    componentDidMount() {
        axios
            .get(`${url}/users/${localStorage.getItem("userId")}`)
            .then(response => {
                console.log(" response from server: ", response.data);
                this.setState({

                });
            });
    }

    componentWillMount() {
        this.setState({
            successFlag: false
        });
    }



    submitHandler = h => {
        h.preventDefault();

        const data = {
            portraitUrl: "",

        };
        console.log(data);

        axios
            .post(
                `${url}/users/${localStorage.getItem("userId")}`,
                data
            )
            .then(response => {
                console.log(" response : ", response);
                console.log(" response status : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        successFlag: true
                    });
                } else {
                    this.props.history.push('/')
                }
            });
    };

    render() {
        // var emailfromprops = this.props.location.state.email;
        // console.log(emailfromprops);
        let header = null;
        if (localStorage.getItem("isAdmin") == "false") {
            header = <Header />
        } else {
            header = <AdminHeader />
        }
        let redirectVar = null
        if (this.state.successFlag) {
            redirectVar = <Redirect to="/searchOrganization" />
        }
        return (
            <div style={{ backgroundColor: "#243e8c" }}>
                {redirectVar}
                <div style={{ backgroundColor: "#243e8c" }}>
                    {header}
                    <div style={{ backgroundColor: "#243e8c" }}>
                        <div class="login-form">
                            <div class="user-div">

                                <b>
                                    Earning Report for Hackathon: Hackathon_Name<br /><br />
                                    <div>
                                    <Button type="primary" onClick={this.showModal}>
                                        Add Expense
                                    </Button>
                                    <CollectionCreateForm
                                        wrappedComponentRef={this.saveFormRef}
                                        visible={this.state.visible}
                                        onCancel={this.handleCancel}
                                        onCreate={this.handleCreate}
                                    />
                                </div>
                                <br/><br/>
                                    Total Revenue from paid registration fee: 1$<br />
                                    Total Revenue from unpaid registration fee: 1$<br />
                                    Total Revenue from sponsors: 1$<br />
                                    Total Expenses: 0$<br />
                                </b>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
