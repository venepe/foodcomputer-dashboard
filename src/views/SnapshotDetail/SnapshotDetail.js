import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchSnapshot } from '../../actions';

class SnapshotDetail extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    this.state = {
      snapshot: {},
      id,
    };
  }

  componentDidMount() {
    this.props.fetchSnapshot(this.state.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.snapshot) {
      this.setState({ snapshot: nextProps.snapshot });
    }
  }

  render() {
    const { snapshot } = this.state;
    return (
      <div className="animated fadeIn">
        <Col>
          <Card>
            <CardImg top width="100%" src={snapshot.uri} alt={snapshot.createdAt} />
            <CardBody>
              <CardTitle>{moment(snapshot.createdAt).format('M/D/YYYY h:mma')}</CardTitle>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  snapshot: state.snapshot,
});

export default connect(
  mapStateToProps,
  { fetchSnapshot },
)(SnapshotDetail);
