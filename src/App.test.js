import { cleanup, fireEvent, getByTestId, render, screen, waitFor, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import EmployeeDetails from './views/EmployeeDetails';
import axios_mock from 'axios';
import Summarry from './components/Employees/Summarry';
import Total from './components/Employees/Total';

const data = {
  data: [
    {
      "id": 1003,
      "employeeId": "07f17d85-d8d9-4802-8db9-e1d50f96ae4b",
      "firstname": "Dunn",
      "lastname": "Rosales",
      "dateJoined": "Fri Dec 09 1994 18:04:18 GMT+0800 (Malaysia Time)",
      "salary": 5863
    },
    {
      "id": 1005,
      "employeeId": "51ce9fe4-7fee-451a-a20c-ef0d626efd3a",
      "firstname": "Lea",
      "lastname": "Lindsay",
      "dateJoined": "Mon Jul 08 1991 13:19:00 GMT+0800 (Malaysia Time)",
      "salary": 8523
    },
    {
      "id": 1006,
      "employeeId": "636d7aa0-1777-46d9-87ac-b1406020372f",
      "firstname": "Morgan",
      "lastname": "Jarvis",
      "dateJoined": "Mon Jul 15 1985 07:25:52 GMT+0800 (Malaysia Time)",
      "salary": 9002
    },
  ]
}

const sort = {
  key: "dateJoined",
  direction: "descending"
}

afterEach(cleanup);

describe('Load EmployeeDetails without fail', () => {

  it('load EmployeeDetails before fetch data', () => {
    render(<EmployeeDetails></EmployeeDetails>);
    const employeeTotal = screen.getByText(/Total of employees/i);

    expect(screen.getByTestId('total-employees')).toHaveTextContent('0')
    expect(screen.getByTestId('section-employee-summarry-loading')).toHaveTextContent(/no data/i)
    expect(screen.getByTestId('section-result-list')).toHaveTextContent(/loading/i)
    expect(employeeTotal).toBeInTheDocument();
  })

  it("fetch data and event click", async () => {

    axios_mock.get.mockResolvedValueOnce(data)

    const url = "https://gist.githubusercontent.com/yousifalraheem/354fb07f27f3c145b78d7a5cc1f0da0b/raw/7561f6827775c6a002a93b6b99b12c3c9454a617/data.json";
    const app = render(<EmployeeDetails url={url}></EmployeeDetails>);

    const axiosCallback = await waitFor(() => { expect(axios_mock.get).toHaveBeenCalled(); })
    expect(axios_mock.get).toHaveBeenCalledTimes(1);

    const first_column = screen.getByTestId('first-column')
    const second_column = screen.getByTestId('second-column')
    const third_column = screen.getByTestId('third-column')

    expect(first_column).toHaveTextContent("Full Name")
    expect(second_column).toHaveTextContent("Date Joined")
    expect(third_column).toHaveTextContent("Salary")

    fireEvent.click(first_column)
    expect(first_column).toHaveClass('asc column');
    fireEvent.click(first_column)
    expect(first_column).toHaveClass('desc column');
    fireEvent.click(first_column)
    expect(first_column).toHaveClass('asc column');

    fireEvent.click(second_column)
    expect(second_column).toHaveClass('asc column');

    fireEvent.click(third_column)
    expect(third_column).toHaveClass('asc column');
    fireEvent.click(third_column)
    expect(third_column).toHaveClass('desc column');
    fireEvent.click(third_column)
    expect(third_column).toHaveClass('asc column');

  })

  it('render total employee with data- <Total/>', () => {

    render(<Total total={data.data.length}></Total>)
    screen.getByText(/Total of employees/i);
    expect(screen.getByTestId('total-employees')).toHaveTextContent(3)

  })

  
  it('render total employee without data- <Total/>', () => {

    render(<Total total={0}></Total>)
    screen.getByText(/Total of employees/i);
    expect(screen.getByTestId('total-employees')).toHaveTextContent(0)

  })

  it('render employee summarry - <Summarry/>', () => {

    render(<Summarry
      highest_earning={data.data[2]}
      recent_joined={data.data[0]}
    ></Summarry>)

    const highest_earning_employee = screen.getByTestId('highest-earning-employer')
    const highest_earning_salary = screen.getByTestId('highest-earning-salary')
    const most_recent_joined_employee = screen.getByTestId('most-recently-joined-employer')
    const most_recent_joined_date = screen.getByTestId('most-recently-joined-date')

    expect(highest_earning_employee).toHaveTextContent("Morgan Jarvis")
    expect(highest_earning_salary).toHaveTextContent("MYR 9,002.00")
    expect(most_recent_joined_employee).toHaveTextContent("Dunn Rosales")
    expect(most_recent_joined_date).toHaveTextContent("Fri Dec 09 1994")

  })

})

