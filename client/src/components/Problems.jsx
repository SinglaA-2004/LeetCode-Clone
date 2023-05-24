import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

    function Problems(){
        const [problems, setProblems] = useState([]);
        const init = async ()=>{
            const response = await fetch("http://localhost:3000/problems", {
                method: 'GET'
            });

            const json = await response.json();
            setProblems(json.problems);
        }

        useEffect(()=>{
            init();
        }, []);



        return <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Acceptance</th>
                    <th scope="col">Difficulty</th>
                </tr>
            </thead>
                {
                    problems.map(problem => <ProblemStatement
                        id={problem.problemId}
                        title={problem.title}
                        acceptance={problem.acceptance}
                        difficulty={problem.difficulty}
                    />)
                }
        </table>
    }
    function ProblemStatement(props) {
        const id = props.id;
        const title = props.title;
        const acceptance = props.acceptance;
        const difficulty = props.difficulty;
        function difficultyColor(difficulty){
            if(difficulty === 'Hard'){
                return 'red';
            }
            else if(difficulty ==='Medium'){
                return 'orange';
            }
            else return 'green';
        }
        return (
            <tr>
                <td scope="row">
                    <Link to={`/problems/${id}`} style={{ textDecoration: 'none', color: '#212529' }}>
                    {id}
                    </Link>
                </td>
                <td>
                    <Link to={`/problems/${id}`} style={{ textDecoration: 'none', color: '#212529' }}>
                    {title}
                    </Link>
                </td>
                <td>
                    <Link to={`/problems/${id}`} style={{ textDecoration: 'none', color: '#212529' }}>
                    {acceptance}
                    </Link>
                </td>
                <td>
                    <Link to={`problems/${id}`} style={{ textDecoration: 'none', color: difficultyColor(difficulty) }}>
                    {difficulty}
                    </Link>
                </td>
            </tr>
        )
    }
    export default Problems;