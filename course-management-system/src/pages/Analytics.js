import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function Analytics() {
    const [years, setYears] = useState([]);
    const [terms, setTerms] = useState([]);
    const [subject, setSubject] = useState('');
    const [course, setCourse] = useState('');
    const [data, setData] = useState([['Academic Year', 'Term', 'Subject',
        'Course No.', 'Course Title', 'Instructor', 'GPA', 'A (%)', 'A- (%)',
        'B+ (%)', 'B (%)', 'B- (%)', 'C+ (%)', 'C (%)', 'C- (%)', 'D+ (%)',
        'D (%)', 'D- (%)', 'F (%)', 'Withdraws', 'Graded Enrollment', 'CRN',
        'Credits']]);
    const type = 'checkbox'

    function handleSubmit() {
        axios.post('http://localhost:5000/analytics', { years, terms, subject, course })
            .then(response => {
                // console.log(response.data); // Log the response from the backend
                // Optionally, you can handle the response here, such as redirecting the user if login is successful
                let newData = data.slice(0, 1);
                newData.push(response.data);
                setData(newData);
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
            });
    }

    function handleAddYear(e) {
        const year = e.target.value;
        let newYears = years;
        if (newYears.includes(year)) {
            newYears = newYears.filter(e => e !== year);
        }
        else {
            newYears.push(year);
        }
        setYears(newYears);
    }

    function handleAddTerm(e) {
        const term = e.target.value;
        let newTerms = terms;
        if (newTerms.includes(term)) {
            newTerms = newTerms.filter(e => e !== term);
        }
        else {
            newTerms.push(term);
        }
        setTerms(newTerms);
    }

    return (
        <div>
            <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={'2021-22'}
                value={'2021-22'}
                onChange={handleAddYear}
            />
            <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={'2022-23'}
                value={'2022-23'}
                onChange={handleAddYear}
            />
            <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={'2023-24'}
                value={'2023-24'}
                onChange={handleAddYear}
            />
            <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={'Fall'}
                value={'Fall'}
                onChange={handleAddTerm}
            />
            <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={'Spring'}
                value={'Spring'}
                onChange={handleAddTerm}
            />
            <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={'Winter'}
                value={'Winter'}
                onChange={handleAddTerm}
            />
            <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={'Summer I'}
                value={'Summer I'}
                onChange={handleAddTerm}
            />
            <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={'Summer II'}
                value={'Summer II'}
                onChange={handleAddTerm}
            />
            <Form.Control
                type="text"
                id="subjectText"
                aria-describedby=""
                onChange={(e) => {
                    setSubject(e.target.value);
                }}
            />
            <Form.Control
                type="text"
                id="courseText"
                aria-describedby=""
                onChange={(e) => {
                    setCourse(e.target.value);
                }}
            />
            <Button variant="secondary" size='lg' onClick={handleSubmit}>Submit</Button>{' '}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        {
                            data[0].map((element, i) => {
                                return <td key={i}>{element}</td>
                            })
                        }
                    </tr>
                </thead>
                <tbody>{
                    data.length === 2 && data[1].map((element, i) => {
                        return <tr key={i}>
                            {
                                element.map((e, i) => {
                                    return <td key={i}>{e}</td>
                                })
                            }
                        </tr>
                    })
                }</tbody>
            </Table>
        </div>
    )
}

export default Analytics
