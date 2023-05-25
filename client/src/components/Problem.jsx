import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


function Problem() {
    const {id} = useParams();
    let probId = id;
    const [problem, setProblem] = useState([]);
    const [solved, setSolved] = useState([]);
    const [submission, setSubmission] = useState("");
    const init = async ()=>{
        const response = await fetch("http://localhost:3000/problems/" + probId, {
            method: 'GET'
        });

        const json = await response.json();
        setProblem(json.problem);
    }

    useEffect(()=>{
        init();
    }, []);
    let title = problem.title;
    let description = problem.description;
    let exampleIn = problem.exampleIn;
    let exampleOut = problem.exampleOut;

    const init2 = async() => {
        const response = await fetch("http://localhost:3000/submissions/" + probId, {
            method: 'GET',
            headers : {
                "authorization" : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setSolved(json.submission);
    }
    useEffect(()=> {
        init2();
    }, []);
    return (
        <>
            <div className="container ">
                <div className="row">
                    <div className="col-6">
                        <h3>Problem {title}</h3>
                        <p>{description}</p>
                        <p style={{color: "grey", fontWeight: "500"}}>
                            Input : {exampleIn}
                        </p>
                        <p style={{color: "grey", fontWeight: "500"}}>
                        Output : {exampleOut}
                        </p>
                        <h4>Your Submissions</h4>


                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">ProbId</th>
                                <th scope="col">UserId</th>
                                <th scope="col">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    solved.map(problem => <SolvedStatus
                                        id={problem.problemId}
                                        user={problem.userId}
                                        status={problem.status}
                                    />)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6" >
                        <h3>Code Here: </h3>
                        <textarea onChange={(e)=> setSubmission(e.target.value)} style={{ width:'100%', height:'600px'}} ></textarea>
                        <button type="submit" className="btn btn-success" style={{margin:'20px', padding:'10px'}}
                        onClick={
                            async ()=>{
                                const response = await fetch('http://localhost:3000/submission', {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "authorization": localStorage.getItem('token')
                                    },
                                    body: JSON.stringify({
                                        problemId : probId,
                                        submission : submission
                                    })
                                })
                                const json = await response.json();
                            }
                        }>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

function SolvedStatus(props) {
    const id = props.id;
    const user = props.user;
    const status = props.status;
    function statusColor(status){
        if(status === 'WA'){
            return 'red';
        }
        else return 'green';
    }
    return (
        <tr>
            <td scope="row">
                {id}
            </td>
            <td>
                    {user}
            </td>
            <td>
                <Link to={`problems/${id}`} style={{ textDecoration: 'none', color: statusColor(status) }}>
                    {status}
                </Link>
            </td>
        </tr>
    )
}


export default Problem;