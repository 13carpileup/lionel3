import { Formik } from 'formik';
import { redirect } from "react-router-dom";
 

export function Home() {
    
    return (
        
        
        <div class = "fade">
            <h1>Lionel 3</h1>
            <p class="subheading">It's like lionel 2, but better.</p>
            <br></br>
            <div class = "sub">
            <h4 class="rqst">Please enter your username:</h4>
            <Formik
            initialValues={{ email: ''}}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                return errors;
            }}
            onSubmit={(values   ) => {
                window.location.replace('/#/user/' + values.email);
                window.location.reload();
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



