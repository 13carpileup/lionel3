import { Formik } from 'formik';
import { redirect } from "react-router-dom";
 

export function Home() {
    
    return (
        
        
        <div class = "fade">
            <h1>Lionel 3</h1>
            <p class="subheading">It's like lionel 2, but better.</p>
            <br></br>
            <div class = "sub">
            <h4 class="rqst">Please enter your lionel username:</h4>
            <Formik
            initialValues={{ email: '', st: ''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                return errors;
            }}
            onSubmit={(values) => {
                let n = values.st.length;
                let lionel_string = values.st.substring(n-36, n-4);
                console.log(lionel_string);

                fetch('https://lionel45.shuttleapp.rs/verify/'+ values.email, {
                    method: "POST",
                    body: JSON.stringify({ lionel_string: lionel_string }),
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                    },
                })
                .then(response => response.json())
                .then(response => {
                    if (response==true) {
                        window.location.replace('/#/user/' + values.email);
                        window.location.reload();
                    } else {
                        console.log("FAILURE");
                        console.log(response);
                        
                        // TODO: Replace with better fail page
                        window.location.reload();
                        values.st = "FAIL";
                    }
                })
                .catch(error => console.error(error));

                
            }}
            >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                <input
                    class="emailEntry"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                <br/>
                <h4 class = "rqst">Please enter your homework API link:</h4>
                <input
                    class="emailEntry"
                    name="st"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.st}
                />
                <br/>
                <button class = "mainButton" type="submit" disabled={isSubmitting}>
                    Login
                </button>
                </form>
            )}
            
            </Formik>

            </div>
        </div>
        
    )
}



