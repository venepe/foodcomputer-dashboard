import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchTemperaturesAndHumidities } from '../../actions';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandInfo = getStyle('--info')

let mainChart = {
  labels: [],
  datasets: [
    {
      label: 'Temperatures',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: [],
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperatures: [],
    };
  }

  componentDidMount() {
    this.props.fetchTemperaturesAndHumidities();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.temperatures) {
      let temperatures = nextProps.temperatures.reverse();
      this.setState({ temperatures });
    }
  }

  render() {

    mainChart.datasets[0].data = this.state.temperatures.map(obj => obj.value);
    let previousDate;
    mainChart.labels = this.state.temperatures.map((obj) => {
      let label;
      let createdAt = obj.createdAt;
      let date = moment(createdAt).format('M/D/YYYY');
      if (date === previousDate) {
        label = moment(createdAt).format('h:mma');
      } else {
        label = moment(createdAt).format('M/D/YYYY h:mma');
      }
      previousDate = date;
      return label;
    });

    console.log(this.state.temperatures);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="10" lg="10">
            <Card>
              <CardBody>
                <div className="chart-wrapper" style={{ marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={{mainChartOpts}} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
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
  temperatures: state.temperatures,
  humidities: state.humidities,
});

export default connect(
  mapStateToProps,
  { fetchTemperaturesAndHumidities },
)(Dashboard);
