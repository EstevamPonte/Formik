import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import jQuery from 'jquery';
export default class FormikEx4 extends Component {
   constructor(props) {
      super(props)
      this.state = {
         curso: []
      }
   }
   componentDidMount() {
      this.searchCursos()

      
   }
   searchCursos() {
      jQuery.ajax({
         method: 'GET',
         url: "http://localhost:8081/api/listCursos/",
         success: (cursos) => {
            this.setState({ curso: cursos })
         },
         statusCode: {
            500: function () {
               alert(":(");
            }
         }
      })
   }
   myForm(props){
      let listCursos = this.state.curso;
      const initialValues = {
         texto: "",
         nome: "",
         periodoDeRealizacao: "",
         cidade: "",
         dataDoCertificado: "",
         ano: "",
      }
      const EventoSchema = Yup.object().shape({
         texto: Yup.string().required('Obrigatorio'),
         nome: Yup.string().required('Obrigatorio'),
         periodoDeRealizacao: Yup.string().required('Obrigatorio'),
         cidade: Yup.string().required('Obrigatorio'),
         dataDoCertificado: Yup.string().required('Obrigatorio'),
         ano: Yup.string().required('Obrigatorio'),
      })
      return (
         <div>
            <Formik
               initialValues={initialValues}
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
                     <select defaultValue="">
                        <option value="" disabled>Cursos</option>
                        {
                           
                           listCursos.map(curso => 
                              <option key ={curso.id}>{curso.nome}</option>
                           )
                           
                        }
                     </select>

                  </div>
               </Form>
            </Formik>
         </div>
      );
   }
   render() {
      return this.myForm(this.props)
   }
}
