import React from 'react';
import { Card } from 'react-bootstrap'

function Total(props) {
    return (
        <Card className="text-center">
            <Card.Body>
                <dl className="total-employee-wrapper m-0">
                    <dt className="total-employee-label">Total of Employees</dt>
                    {(props.total.length === 0) ? 0 :
                        <dd className="total-employee-result m-0" data-testid="total-employees">{props.total}</dd>
                    }
                </dl>
            </Card.Body>
        </Card>
    );
}

export default Total;