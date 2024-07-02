import { Formik } from 'formik';
import { redirect } from "react-router-dom";
 

export function Home() {
    
    return (
        
        
        <div class = "fade">
            <h1>Lionel 3</h1>
            <p class="subheading">It's like lionel 2, but better.</p>
            <br></br>
            <div class = "sub">
            <h4 class="rqst">Please enter your unique id:</h4>
            <Formik
            initialValues={{ email: '', st: 'string'}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                return errors;
            }}
            onSubmit={(values   ) => {
                fetch('https://lionel45.shuttleapp.rs/students/verify/'+ values.email, {
                    method: "POST",
                    body: JSON.stringify({ lionel_string: values.st }),
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
                        window.location.replace('/#/user/LOSER');
                        window.location.reload();
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
                <input
                    class="emailEntry"
                    name="st"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.st}
                />
                <button class = "mainButton" type="submit" disabled={isSubmitting}>
                    Send
                </button>
                </form>
            )}
            
            </Formik>

            </div>
        </div>
        
    )
}



