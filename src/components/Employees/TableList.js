import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap'

const SortData = (data, sorts) => {

    let sortableData = [...data];
    let [sort, setSort] = useState(sorts);
    let [column_class, setColumnClass] = useState("column desc");

    const valueType = (column, before, after) => {

        switch (column) {
            case "fullname":
                let nameA = (before['firstname'] + " " + before['lastname']).toLowerCase();
                let nameB = (after['firstname'] + " " + after['lastname']).toLowerCase();
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                return 0;
                break;
            case "dateJoined":
                return new Date(before[column]) - new Date(after[column]);
                break;
            case "salary":
                return parseFloat(before[column] - parseFloat(after[column]));
                break;
        }
    }

    const setClass = (direction) => {
        if (direction === "ascending") {
            setColumnClass('column asc');
        }
        else {
            setColumnClass('column desc');
        }

    }

    const setSortDetails = (column) => {
        let direction = "ascending";

        //if this column same with current column sort, change sort direction
        if (sort && sort.key === column && sort.direction === "ascending") { direction = "descending" }

        setSort({ key: column, direction })
        setClass(direction);
    }

    if (sort != null) {
        let key = sort.key;
        if (sort.direction == "ascending") {
            sortableData.sort((a, b) => {
                return valueType(key, a, b);
            });
        }
        else if (sort.direction == "descending") {
            sortableData.sort((a, b) => {
                return valueType(key, b, a);
            });
        }

    }

    return { items: sortableData, setSortDetails, sort, column_class }

}

function TableList(props) {

    const [list, setList] = useState([]);
    const { items, setSortDetails, sort, column_class } = SortData(props.list, props.sort);

    useEffect(() => {
        setList(props.list);
    });

    return (
        <>
            { (items.length === 0) ?
                <Card className="w-100"><Card.Body >No data.</Card.Body></Card>
                :
                <Table
                    data-testid="section-result-list-success" striped bordered hover size="sm"
                    className="employee-table-list"
                    aria-label="Employee List Table"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th scope="col">
                                <button
                                    className={(sort.key === "fullname") ? column_class : ""}
                                    aria-label={`Sorted column full name in ${(sort.key == "fullname") ? sort.direction : "ascending"}`}
                                    data-testid="first-column"
                                    onClick={() => setSortDetails('fullname')} >Full Name</button>
                            </th>
                            <th scope="col">
                                <button
                                    className={(sort.key === "dateJoined") ? column_class : ""}
                                    aria-label={`Sorted column date joined in ${(sort.key == "dateJoined") ? sort.direction : "ascending"}`}
                                    data-testid="second-column"
                                    onClick={() => setSortDetails('dateJoined')} >Date Joined</button>
                            </th>
                            <th scope="col">
                                <button
                                    className={(sort.key === "salary") ? column_class : ""}
                                    aria-label={`Sorted column salary in ${(sort.key == "salary") ? sort.direction : "ascending"}`}
                                    data-testid="third-column"
                                    onClick={() => setSortDetails('salary')} >Salary</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody data-testid="tbody">
                        {
                            items.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.firstname + " " + item.lastname}</td>
                                    <td>{new Date(item.dateJoined).toDateString()}</td>
                                    <td>{(item.salary).toLocaleString('my-MY', {
                                        style: "currency",
                                        currency: "MYR"
                                    })}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            }
        </>
    );
}

export default TableList;
