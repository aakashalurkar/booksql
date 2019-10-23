import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../Miscellanous/Header";
import Footer from "../Miscellanous/Footer";
import HackathonCard from "../Hackathon/CardSearchHackathon";
// import CardResultAll from './CardResultAll';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   hackathon_list: [],
      successFlag: false,
    //   requestThrough: false,
    //   routeCreateOrg: false,
    //   search: false,
    //   searchKey: "",
    //   join: false,
    //   alice: false,
    all_list:[],
      winners_list: [],
      others_list: []
    };

  }

  searchKeyChange(event) {
    this.setState({ searchKey: event.target.searchKey });
  }

  componentDidMount() {
    // console.log("DATA",data);
    console.log("local storage",localStorage.getItem("userId"));
    // alert(localStorage.getItem("userId"));
    // if (localStorage.getItem("userId") === 19) {
    //   console.log("alice");
    //   // alert("alice");

    //   this.setState({
    //     alice: true
    //   });

    //   this.state.alice = true;

    //   console.log("alice" + this.state.alice);
    //   // alert("alice" + this.state.alice);
    // }

    var self = this;
    // var headers = {
    //   Authorization:
    //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyNUBnbWFpbC5jb20iLCJleHAiOjE1NTgxNjQ2OTd9.HBZDR9CURIkZ-7IkRLA5_-k0_XcceFo83q99wkTcjFK0B9XzK8PRFub23DmXQnZ-CVbPUcFfus73qg0fSvTTTQ"
    // };

    var headers = {
      Authorization: localStorage.getItem("token")
    };

    var data = {
        eventName : "FinalHackathon4"
    }

    // axios.get


    axios
      .get('http://localhost:8080/hackathons/finaliseHackathon', {
          data: {
            eventName : "FinalHackathon4"
          }
        // data
      })
      .then(response => {
        console.log('result body : ' + JSON.stringify(response.data))
        //resp = JSON.stringify(response);

        self.setState({
        //   hackathon_list: response.data,
            all_list: response.data,
            winners_list: response.data[0].Winners,
            others_list: response.data[0].Others
        });

        // alert("response " + response.data);
        // this.state.org_list = this.state.property_list.concat(response.data);
        //console.log("hi" + resp);
      })
      .catch(function(error) {
        // handle error
        console.log("error: " + error);
      });

    // console.log("out resp " + JSON.stringify(this.state.hackathon_list));
    console.log("ALL ",JSON.stringify(this.state.all_list));
    console.log("WINNERS ", JSON.stringify(this.state.winners_list));
    console.log("OTHERS ", JSON.stringify(this.state.others_list));
  }

  componentWillMount() {
    this.setState({
      successFlag: false
    });
  }

 
  routeChange() {
    this.setState({
      routeCreateOrg: true
    });
  }

  requestFunc = item => {
    //h.preventDefault();

    console.log("button: ");
    // alert("button: ");
    // var self = this;
    // var data = {
    //   user_id: item.user_id,
    //   organization_id: item.organization_id
    // };

    // this.setState({
    //   join: true
    // });

    // var headers = {
    //   Authorization: localStorage.getItem("token")
    // };
    // // var headers = {
    // //   Authorization:
    // //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyNUBnbWFpbC5jb20iLCJleHAiOjE1NTgxNjQ2OTd9.HBZDR9CURIkZ-7IkRLA5_-k0_XcceFo83q99wkTcjFK0B9XzK8PRFub23DmXQnZ-CVbPUcFfus73qg0fSvTTTQ"
    // // };
    // axios
    //   .post("http://localhost:8080/joinrequest/send", data, {
    //     headers
    //   })
    //   .then(response => {
    //     //resp = JSON.stringify(response);

    //     self.setState({
    //       requestThrough: true
    //     });

    //     //alert("response " + response.data);

    //     this.state.requestThrough = true;
    //     //console.log("hi" + resp);
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log("error: " + error);
    //   });
  };

  render() {
    console.log("this.state.requestThrough: " + this.state.requestThrough);
    let redirectVar = null;
    if (this.state.successFlag) {
      console.log("Inside");
      redirectVar = <Redirect to="/" />;
    }

    let temp = null;
    // if (this.state.join) {
    //   console.log("joining");
    //   // alert("joining");
    //   temp = <Redirect to="/registerForHackathon" />;
    // }

    // let tem = null;
    // if (this.state.alice) {
    //   console.log("alice");
    //   // alert("alice");
    //   temp = <h3>Alice here</h3>;
    // }

    // let CreateOrg = null;
    // if (this.state.routeCreateOrg) {
    //   console.log("Inside 1");
    //   CreateOrg = <Redirect to="/createOrganization" />;
    // }

    console.log("winners: " + this.state.winners_list);
    console.log("others: " + this.state.others_list);
    var arr3 = Object.values(this.state.winners_list);
    console.log(arr3);
    // console.log(this.state.property_list.length)
    var elements = [];
    // for (var i = 0; i < this.state.winners_list.length; i++) {
    //   var name = arr3[i].name;
    //   // if (name.includes(this.state.searchKey)) {
    //   elements.push(
    //     <CardResultAll key={i} props={arr3[i]} func={this.requestFunc} />
    //   );
    //   // }
    // }

    var page = null;

    if (this.state.requestThrough) {
      page = (
        <div class="organization-main-div">
          {/* <img src={openhacklogo} width="75px" height="75px" /> */}
          {/* <h2>Thank you! The request is sent to the Hackathon!</h2> */}
        </div>
      );
    } else {
      page = (
        <div class="organization-main-div">
          {/* {CreateOrg}
          {temp} */}
          <div class="organization-panel">
            {/* <img src={openhacklogo} width="75px" height="75px" /> */}
            <h2>Results for Hackathon</h2>

            <br />
            <div class="form-group">
              <div class="input-group mb-3">
                {/* <input
                  type="text"
                  class="form-control"
                  placeholder="Organization Name"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={this.state.searchKey}
                  onChange={this.searchKeyChange}
                /> */}
                {/* <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    id="button-addon2"
                    onClick={this.search}
                  >
                    Search
                  </button>
                  <span class="tabmini" />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={this.routeChange}
                    style={{
                      display:
                        localStorage.getItem("userId") === 19 ? "none" : "block"
                    }}
                  >
                    + Open
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          {elements}
 
        </div>
      );
    }

    return (
      <div style={{ backgroundColor: "#f2f2f2" }}>
        {/* {redirectVar} */}
        <Header />
        <div>
          <div>
            <div class="organization-login-form">{page}</div> />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}