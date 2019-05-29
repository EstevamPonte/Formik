import React, { Component } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMenssage, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
   friends: [
      {
         name: '',
         email: '',
      },
   ],
};

const FormikEx2 = () => (
   <div>
      <h1>Invite Friends</h1>
      <Formik
         initialValues={initialValues}
         validationSchema={Yup.object({
            friends: Yup.array().of(Yup.object({
               name: Yup.string().required('Required'),
               email: Yup.string().email('Invalid email!').required('Required')
            }))
         })}
         onSubmit={values => {
            setTimeout(() => {
               alert(JSON.stringify(values, null, 2))
            }, 500)
         }}
      >
         {({ values, isSubmitting }) =>
            <Form>
               <FieldArray name="friends">
                  {({ push, remove }) => (
                     <React.Fragment>
                        {values.friends && values.friends.length > 0 && values.friends.map((friend, index) =>
                           <div className="row">
                              <div>
                                 <Field name={`friends[${index}].name`}>
                                    {({ field, form }) => (
                                       <input {...field} type="text" placeholder="Jane Doe" />
                                    )}
                                 </Field>
                                 <ErrorMessage name={`friends[${index}].name`}>
                                    {msg => <div>{msg}</div>}
                                 </ErrorMessage>
                              </div>

                              <div className="col">
                                 <Field
                                    name={`friends[${index}].email`}
                                    type="email"
                                    placeholder="jane@example.com"
                                 />
                                 <ErrorMessage name={`friends[${index}].email`}>
                                    {msg => <div>{msg}</div>}
                                 </ErrorMessage>
                              </div>
                              <div className="col">
                                 <button
                                    type="button"
                                    onClick={() => remove(index)}
                                 >X</button>
                              </div>
                           </div>
                        )}
                        <button
                           type="button"
                           onClick={() => push({ name: '', email: '' })}
                        >Add Friend</button>
                     </React.Fragment>
                  )}
               </FieldArray>
               <button type="submit" disabled={isSubmitting}>Invite</button>
            </Form>}
      </Formik>
   </div>
)

export default FormikEx2;