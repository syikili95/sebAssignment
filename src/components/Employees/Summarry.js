import React from 'react';
import { Badge, Card } from 'react-bootstrap'

function Summarry(props) {

    const high_earner = props.highest_earning;
    const recent_join = props.recent_joined;

    return (
        <>
            {
                high_earner === null || recent_join === null ? <Card className="text-center"><Card.Body data-testid="section-employee-summarry-loading">No Data.</Card.Body></Card> :
                    <Card className="employee-summarry-section">
                        <Card.Body data-testid="section-employee-summarry-success">
                            <dl>
                                <div className="d-flex">
                                    <dt>Highest earning employee : </dt>
                                    <dd className="lbl-high-earning-employee ml-auto" data-testid="highest-earning-employer">{high_earner.firstname + " " + high_earner.lastname}</dd>
                                    <dd className="lbl-high-earning-salary" data-testid="highest-earning-salary">{(props.highest_earning.salary).toLocaleString('my-MY', {
                                        style: "currency",
                                        currency: "MYR"
                                    })}</dd>
                                </div>
                                <div className="d-flex">
                                    <dt>Employee most recently joined: </dt>
                                    <dd className="lbl-most-recent-employee ml-auto" data-testid="most-recently-joined-employer">{recent_join.firstname + " " + recent_join.lastname}</dd>
                                    <dd className="lbl-most-recent-date" data-testid="most-recently-joined-date">{new Date(recent_join.dateJoined).toDateString()}</dd>
                                </div>
                            </dl>
                        </Card.Body>
                    </Card>
            }
        </>

    );
}

export default Summarry;