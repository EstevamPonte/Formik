import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import jQuery from 'jquery';
import axios from 'axios';



const EventoSchema = Yup.object().shape({
   texto: Yup.string().required('Obrigatorio'),
   nome: Yup.string().required('Obrigatorio'),
   periodoDeRealizacao: Yup.string().required('Obrigatorio'),
   cidade: Yup.string().required('Obrigatorio'),
   dataDoCertificado: Yup.string().required('Obrigatorio'),
   ano: Yup.string().required('Obrigatorio'),
   curso: Yup.string().required('Obrigatorio')

})

// const searchCursos = () => {
//    jQuery.ajax({
//       method: 'GET',
//       url: "http://localhost:8081/" + 'api/listCursos/',
//       success: (cursos) => {
//          listarCursos = cursos

//          console.log(listarCursos)
//          return listarCursos

//       },
//       statusCode: {
//          500: function () {
//             alert(":(");
//          }
//       }
//    })
// }
let listarCursos = []

const getCurso = () => {
   axios.get("http://localhost:8081/" + 'api/listCursos/')
      .then(function (resp) {
         listarCursos= resp.data
         console.log(listarCursos)
      })
      .catch(function (error) {
         console.log(error);
      })
}
getCurso()
console.log(listarCursos)





const FormikEx3 = ({ values, errors, touched, handleChange, isSubmitting }) => (
   <div>
     <Formik
         initialValues={{
            texto: "",
            nome: "",
            periodoDeRealizacao: "",
            cidade: "",
            dataDoCertificado: "",
            ano: "",
            curso: "",
         }}
         onSubmit={values => {
            setTimeout(() => {
               alert(JSON.stringify(values, null, 2))
            }, 500)
         }}
         validationSchema={EventoSchema}
      >
         <Form>
            <div className={"row"}>
               <div className={'input-field col s12 m12'}>
                  <label className='active' htmlFor={'texto'}>Texto inicial do certificado </label>
                  <Field type={'text'} name="texto"
                     placeholder="Ex: participou da ..., participou como Apresentador(a)..., foi bolsista do..." />
                  <ErrorMessage name="texto" component="div" />
               </div>
               <div className={'input-field col s12 m12'}>
                  <label className='active' htmlFor={'nome'}>Nome do Evento</label>
                  <Field type={'text'} name="nome" placeholder="Ex: Semana Acadêmica" />
                  <ErrorMessage name="nome" component="div" />
               </div>
               <div className={'input-field col s12 m12'}>
                  <label className='active' htmlFor={'periodoDeRealizacao'}>Periodo de Realização</label>
                  <Field type={'text'} name="periodoDeRealizacao"
                     placeholder="Ex: no período de ..., no de ..., realizado no dia ..." />
                  <ErrorMessage name="periodoDeRealizacao" component="div" />
               </div>
               <div className={'input-field col s12 m12'}>
                  <label className='active' htmlFor={'cidade'}>Cidade</label>
                  <Field type={'text'} name="cidade" placeholder="Ex: Fortaleza" />
                  <ErrorMessage name="cidade" component="div" />
               </div>
               <div className={'input-field col s6 m6'}>
                  <label className='active' htmlFor={'dataDoCertificado'}>Data do Certificado</label>
                  <Field type={'text'} name="dataDoCertificado" placeholder="Ex: 28 de maio de 2017" />
                  <ErrorMessage name="dataDoCertificado" component="div" />
               </div>
               <div className={'input-field col s6 m6'}>
                  <label className='active' htmlFor={'ano'}>Ano do Evento</label>
                  <Field type={'text'} name="ano" placeholder="Ex: 2018" />
                  <ErrorMessage name="ano" component="div" />
               </div>
            </div>
            <div className="row">
               <select defaultValue="" name="curso" onChange={handleChange}>
                  <option value="" disabled >Curso</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  {/* {listarCursos.map((curso, index) => 
                     <option key={index}  value={curso}>{curso}</option>   
                     )} */}
               </select>
               
            </div>
            <button type="submit" disabled={isSubmitting}>Invite</button>
         </Form>
      </Formik>
   </div>
);



export default FormikEx3;
