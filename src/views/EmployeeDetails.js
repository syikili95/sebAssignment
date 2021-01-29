import React, { Component } from 'react';
import TableList from '../components/Employees/TableList';
import TopBannerDetails from '../components/Employees/TopBannerDetails';
import axios from 'axios'
import { Card } from 'react-bootstrap';

class EmployeeDetails extends Component {

    state = {
        employee_list: [],
        loading: true,
        highest_earning: null,
        recent_joined: null,
        sort: {
            key: "dateJoined",
            direction: "descending"
        }
    };

    componentDidMount = () => {
        this.getEmployeeList();
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    async getEmployeeList() {
        try {
            const response = await axios.get(this.props.url);
            this.setState({
                employee_list: response.data,
                loading: false,
            });
            this.getHighestEarningEmployee();
            this.getMostRecentJoined();
        }
        catch (err) {
            // console.log(err);
        }
    }

    getHighestEarningEmployee = () => {
        let obj = this.state.employee_list.reduce((max, game) => max.salary > game.salary ? max : game);
        this.setState({ highest_earning: obj });
    };

    getMostRecentJoined = () => {
        let obj = this.state.employee_list.reduce((a, b) => {
            return new Date(a.dateJoined) > new Date(b.dateJoined) ? a : b;
        });
        this.setState({ recent_joined: obj });
    };

    loadResultList = () => {
        if (this.state.employee_list.length === 0) {
            return <Card className="section-result-list-loading"><Card.Body>No data.</Card.Body></Card>
        }
        else {
            return <TableList
                list={this.state.employee_list}
                sort={this.state.sort}></TableList>
        }
    }

    loadEmployeeSummarry = () => {
        if (this.state.employee_list.length === 0) {
            return <Card><Card.Body>No Data.</Card.Body></Card>
        }
        else {
            return <TopBannerDetails
                total={this.state.employee_list.length}
                highest_earning={this.state.highest_earning}
                recent_joined={this.state.recent_joined}
                formatDate={this.formatDate}></TopBannerDetails>
        }
    }

    render() {
        return (
            <>

                <TopBannerDetails
                    total={this.state.employee_list.length}
                    highest_earning={this.state.highest_earning}
                    recent_joined={this.state.recent_joined}
                    loadEmployeeSummarry={() => { this.loadEmployeeSummarry() }}></TopBannerDetails>
                {
                    (this.state.loading) ?
                        <Card className="section-result-list-loading" ><Card.Body data-testid="section-result-list">Loading...</Card.Body></Card> :
                        this.loadResultList()
                }

            </>
        );
    }
}

export default EmployeeDetails;