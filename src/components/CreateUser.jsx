import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name= event.target.name;
        const value = event.target.value;
        setInputs((values) => ({...values, [name]:value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8005/api/", inputs).then(function (response) {
        console.log(response.data);
        navigate("/");
       });
        console.log(inputs);
    };


  return (
    <div>
        <h2 className="create">Create New User</h2>
        <form onSubmit={handleSubmit}>
            <div className="input-container">
                <div className="input-data">
                <label htmlFor="name">Name :</label>
                <input type="text" name="name" onChange={handleChange} className="input-field" />
                </div>
                <div className="input-data">
                <label htmlFor="email">Email :</label>
                <input type="text" name="email" onChange={handleChange} className="input-field" />
                </div>
                <div className="input-data">
                <label htmlFor="mobile">Mobile :</label>
                <input type="text" name="mobile" onChange={handleChange} className="input-field" />
                </div>
                <button className="save-btn">Save</button>
            </div>
            
        </form>
    </div>
  )
}

export default CreateUser;