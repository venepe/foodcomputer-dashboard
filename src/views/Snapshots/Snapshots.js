import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchSnapshots } from '../../actions';

class Snapshots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snapshots: [],
    };
  }

  componentDidMount() {
    this.props.fetchSnapshots();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.snapshots) {
      this.setState({ snapshots: nextProps.snapshots });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {this.state.snapshots.map((snapshot, index) => {
            return (
              <Col key={index} xs="6" sm="4" lg="3">
                <Card>
                  <CardImg top width="100%" src={snapshot.uri} alt={snapshot.createdAt} />
                  <CardBody>
                    <CardTitle>{moment(snapshot.createdAt).format('M/D/YYYY h:mma')}</CardTitle>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
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
