import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { fetchSnapshots } from '../../actions';

class Snapshots extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  componentDidMount() {
    this.props.fetchSnapshots();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {

    console.log(this.props.snapshots);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="10" lg="10">
            <Card>
              <CardBody>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  {this.props.snapshots.map((snapshot, index) => {
                    console.log(snapshot.uri);
                    return (
                      <img key={index} src={snapshot.uri} className="d-block w-100"></img>
                    );
                  })}
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  snapshots: state.snapshots,
});

export default connect(
  mapStateToProps,
  { fetchSnapshots },
)(Snapshots);
