import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Admin/AdminHeader";
import Footer from "../Miscellanous/Footer";
import 'antd/dist/antd.css';
import { Form, Select } from 'antd';
import { url } from '../Config_url'

const listOfUsers = ['Select Judges'];
const listOfOrgs = ['Select Organizations'];

export default class CreateHackathon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      description: "",
      fee: "",
      startTime: "",
      endTime: "",
      minTeamSize: "",
      maxTeamSize: "",
      passIdToProps: "",
      tempJudge: "",
      sponsors: "",
      discount: "",
      selectedorgs: "",
      fetchedOrgs: [],
      orgs: [],
      fetchedUsers: [],
      judges: [],
      successFlag: false,
      errMsg: null
    };

    this.eventNameHandler = this.eventNameHandler.bind(this);
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.feeHandler = this.feeHandler.bind(this);
    this.minTeamSizeHandler = this.minTeamSizeHandler.bind(this);
    this.maxTeamSizeHandler = this.maxTeamSizeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    // this.judgeHandler = this.judgeHandler.bind(this);
    this.startTimeHandler = this.startTimeHandler.bind(this);
    this.endTimeHandler = this.endTimeHandler.bind(this);

    this.sponsorsHandler = this.sponsorsHandler.bind(this);
    this.discountHandler = this.discountHandler.bind(this);
  }
  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

  componentDidMount() {
    var headers = {
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(`${url}/organizations/getAllOrganistions`, {
        headers
      })
      .then(response => {
        console.log(" all orgs " + JSON.stringify(response.data))
        this.setState({
          fetchedOrgs: response.data
        })
        console.log(" Org Length :", this.state.fetchedOrgs.length)

        for (var i = 0; i < this.state.fetchedOrgs.length; i++) {
          listOfOrgs.push(this.state.fetchedOrgs[i].name)
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });

    axios
      .get(`${url}/users/getAllUsers`, {
        headers
      })
      .then(response => {
        console.log(" response " + JSON.stringify(response.data))
        this.setState({
          fetchedUsers: response.data
        })
        console.log(" Judges :", this.state.fetchedUsers.length)

        for (var i = 0; i < this.state.fetchedUsers.length; i++) {
          listOfUsers.push(this.state.fetchedUsers[i].email)
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });

  }


  eventNameHandler = h => {
    this.setState({
      eventName: h.target.value
    });
  };
  descriptionHandler = h => {
    this.setState({
      description: h.target.value
    });
  };
  feeHandler = h => {
    this.setState({
      fee: h.target.value
    });
  };
  minTeamSizeHandler = h => {
    this.setState({
      minTeamSize: h.target.value
    });
  };
  maxTeamSizeHandler = h => {
    this.setState({
      maxTeamSize: h.target.value
    });
  };
  // judgeHandler = h => {
  //   this.setState({
  //     tempJudge: h.target.value
  //   });
  // };
  startTimeHandler = h => {
    this.setState({
      startTime: h.target.value
    });
  };
  endTimeHandler = h => {
    this.setState({
      endTime: h.target.value
    });
  };

  sponsorsHandler = h => {
    this.setState({
      sponsors: h.target.value
    });
  }

  discountHandler = h => {
    this.setState({
      discount: h.target.value
    });
  }

  handleOptionChange = judges => {
    this.setState({ judges });
  };

  handleOptionOrgsChange = orgs => {
    this.setState({ orgs });
  }

  // handleRedirect = (e) => {
  //   document.getElementById("modelCloseBtn").click();
  //   // window.location.reload();
  // }
  submitHandler = (h) => {
    h.preventDefault();

    // var emailList = this.state.tempJudge.split(",");
    // for (var i = 0; i < emailList.length; i++) {
    //   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //   var result = regex.test(emailList[i]);

    //   if (!result) {
    //     alert("Invalid Email");
    //     //document.getElementById("demo").innerHTML = "sorry enter a valid";
    //     return false;
    //   }

    //   //   document.getElementById("demo").innerHTML =
    //   //     "Ur email address is successfully submitted";
    //   console.log(" yes ... ", emailList);
    //   for (var i = 0; i < emailList.length; i++) {
    //     this.state.judges.push({
    //       email: emailList[i]
    //     });
    //   }
    //   console.log(this.state.judges);
    // }
    if (this.state.startTime > this.state.endTime) {
      this.setState({
        errMsg: "Start Date cannot be after end Date"
      })
    }
    var theJudges = []
    for (var i = 0; i < this.state.judges.length; i++) {
      theJudges.push({
        'email': this.state.judges[i]
      })
    }

    var theOrgs = "";
    console.log("ORGGSS",this.state.orgs);
    for (var i = 0; i < this.state.orgs.length; i++) {
      theOrgs += this.state.orgs[i];
      theOrgs += ",";
    }
    theOrgs = theOrgs.slice(0,-1);

    // for (var i = 0; i < this.state.orgs.length; i++) {
    //   this.state.selectedorgs += theOrgs.name + ",";
    // }

    // console.log("selected orgs", this.state.selectedorgs);
    console.log(" sponsers : " + theOrgs)
    const data = {
      eventName: this.state.eventName,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      description: this.state.description,
      fee: this.state.fee,
      minTeamSize: this.state.minTeamSize,
      maxTeamSize: this.state.maxTeamSize,
      // sponsors: this.state.sponsors,
      discount: this.state.discount,
      createdBy: localStorage.getItem("email"),
      judges: theJudges,
      sponsorers: theOrgs
      // judges : [
      //     {
      //         "email": "123@gmail.com"
      //     },
      //     {
      //         "email": "456@gmail.com"
      //     }
      // ]
    };
    console.log(" vrushali data " + data)

    if (this.state.startTime < this.state.endTime) {
      axios.post(`${url}/hackathons`, data)
        .then((response) => {
          console.log(" response " + JSON.stringify(response.data));
          console.log(" reposne status : " + response.status)
          
          if (response.status === 200) {
            //document.getElementById("createButton").click();
            console.log(" vrushali data " + data)
              this.setState({
                successFlag : true
              })
            // const doSomething = async () => {
            //   await sleep(2000)
            //   //do stuff
            // }
            
           // window.location.replace(`${url}/cardAdminHackathon`);
          }
        });
    }

  };

  render() {
    // console.log(listOfUsers)
    // console.log("LIST OF ORGS", listOfOrgs)
 
    // console.log(" vrushali data " + this.state.selectedorgs)
    // console.log(" vrushali data2 " + this.state.selectedorgs)
    const { judges } = this.state
    const { orgs } = this.state
    // console.log("ORGGSS",orgs);
    let error = null;
    if (this.state.errMsg != null) {
      error = <h4 style={{ color: "red" }}>{this.state.errMsg}</h4>
    }
    // const filteredOptions = listOfUsers.filter(o => !selectedItems.includes(o));
    const filteredOptions = listOfUsers;
    const filteredOrgs = listOfOrgs;
    let redirectVar = null;
    if (this.state.successFlag) {
      redirectVar = <Redirect to='/cardAdminHackathon' />
    }
    return (
      <div style={{ backgroundColor: "#f2f2f2" }}>
        {redirectVar}
        <Header />
        <div>
          <div>
            <div class="hackathon-login-form">
              <div class="hackathon-main-div">
                <div class="hackathon-panel">
                  {/* <img src={openhacklogo} width="75px" height="75px" /> */}
                  <h2>Create A Hackathon</h2>
                  <br />
                </div>
                <form>
                  <div class="form-group">
                    <input
                      name="eventName"
                      class="form-control"
                      type="text"
                      placeholder="Enter the Event Name"
                      onChange={this.eventNameHandler}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      name="description"
                      class="form-control"
                      type="text"
                      placeholder=" Description (10 chars)"
                      onChange={this.descriptionHandler}
                      required
                    />
                  </div>
                  <div class="form-row">

                    <div class="form-group col-md-6">
                      <input
                        name="startTime"
                        class="form-control"
                        type='Date'
                        placeholder="Start Date"
                        onChange={this.startTimeHandler}
                        required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <input
                        name="endTime"
                        class="form-control"
                        type="Date"
                        placeholder="End Date"
                        onChange={this.endTimeHandler}
                        required
                      />
                    </div>

                  </div>
                  {/* <div class="form-group">
                    <input
                      name="startTime"
                      class="form-control"
                      type='Date'
                      placeholder="Start Date"
                      onChange={this.startTimeHandler}
                      required
                    />
                  </div>

                  <div class="form-group">
                    <input
                      name="endTime"
                      class="form-control"
                      type="Date"
                      placeholder="End Date"
                      onChange={this.endTimeHandler}
                      required
                    />
                  </div> */}
                  {error}
                  <div class="form-group">
                    <input
                      name="fee"
                      class="form-control"
                      type="text"
                      placeholder="Amount to Pay"
                      onChange={this.feeHandler}
                      required
                    />
                  </div>
                 
                  <div class="form-row">

                    <div class="form-group col-md-6">
                      <input
                        name="minTeamSize"
                        class="form-control"
                        type="text"
                        placeholder="Minimum Team Size"
                        onChange={this.minTeamSizeHandler}
                        required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <input
                        name="maxTeamSize"
                        class="form-control"
                        type="text"
                        placeholder="Maximum Team Size"
                        onChange={this.maxTeamSizeHandler}
                        required
                      />
                    </div>

                  </div>

                  {/* <div class="form-group">
                    <input
                      name="minTeamSize"
                      class="form-control"
                      type="text"
                      placeholder="Minimum Team Size"
                      onChange={this.minTeamSizeHandler}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      name="maxTeamSize"
                      class="form-control"
                      type="text"
                      placeholder="Maximum Team Size"
                      onChange={this.maxTeamSizeHandler}
                      required
                    />
                  </div> */}

                  <div className="App">
                    <div className="box effect1">
                      <div className="contentClass">
                        <Form.Item
                          style={{ width: '100%' }}>
                          <Select
                            mode="multiple"
                            placeholder="Choose Organizations(s)"
                            value={orgs}
                            onChange={this.handleOptionOrgsChange}
                            style={{ width: '100%' }}>
                            {filteredOrgs.map(item => (
                              <Select.Option key={item} value={item}>
                                {item}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div >
                  
                  <div class="form-group">
                    <input
                      name="maxTeamSize"
                      class="form-control"
                      type="text"
                      placeholder="Discount"
                      onChange={this.discountHandler}
                    />
                  </div>



                  <div className="App">
                    <div className="box effect1">
                      <div className="contentClass">
                        <Form.Item
                          style={{ width: '100%' }}>
                          <Select
                            mode="multiple"
                            placeholder="Choose judge(s)"
                            value={judges}
                            onChange={this.handleOptionChange}
                            style={{ width: '100%' }}>
                            {filteredOptions.map(item => (
                              <Select.Option key={item} value={item}>
                                {item}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </div >


                  {/* <div class="form-group">
                    <input
                      name="team"
                      class="form-control"
                      type="text"
                      placeholder="Enter Judge Emails byseparator (,)"
                      onChange={this.judgeHandler}
                      required
                    />
                  </div> */}

                  <br />
                  <button
                    type="submit" onClick={this.submitHandler}
                    class="btn btn-secondary btn-lg btn-block"
                  >
                    Create
                  </button>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        {/* <button id="createButton" href="#createModal" class="delete" data-toggle="modal" style={{ display: "none" }} type="button" class="btn btn-success">
          Play
                </button> */}
        {/* <div id="createModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form>
                <div class="modal-header">
                  <h4 class="modal-title">Hackathon Created</h4>
                </div>
                <div class="modal-footer">
                  <input id="modelCloseBtn" onClick={this.handleRedirect} type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                </div>
                <div class="modal-footer">
                                    <Link to = {`/admin/delete/`} data-dismiss="modal" class="btn btn-success" value="Cancel"></Link>
                                </div>
              </form>

            </div>
          </div>
        </div> */}
      </div>
    );
  }
}