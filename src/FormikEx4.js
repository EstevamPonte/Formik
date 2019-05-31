import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import jQuery from 'jquery';
export default class FormikEx4 extends Component {
   constructor(props) {
      super(props)
      this.state = {
         curso: [],
         chancelas: []
      }
   }
   componentDidMount() {
      this.searchCursos()
      this.searchChancelas()
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

   searchChancelas() {
      jQuery.ajax({
         method: 'GET',
         url: "http://localhost:8081/api/listChancelas/",
         success: (chancelas) => {
            this.setState({ chancelas })
         },
         statusCode: {
            500: function () {
               alert(":(");
            }
         }
      })
   }
   myForm(props) {
      let listCursos = this.state.curso;
      let listChancelas= this.state.chancelas;

      const { values, errors, touched, handleChange, isSubmitting } = props
      const initialValues = {
         texto: "",
         nome: "",
         periodoDeRealizacao: "",
         cidade: "",
         dataDoCertificado: "",
         ano: "",
         curso: "",
         chancela:"",
      }
      const EventoSchema = Yup.object().shape({
         texto: Yup.string().required('Obrigatorio'),
         nome: Yup.string().required('Obrigatorio'),
         periodoDeRealizacao: Yup.string().required('Obrigatorio'),
         cidade: Yup.string().required('Obrigatorio'),
         dataDoCertificado: Yup.string("Use uma data valida Ex: 01/01/2001").required('Obrigatorio'),
         ano: Yup.string().required('Obrigatorio'),
         curso: Yup.string().required('Obrigatorio'),
         chancela: Yup.string().required('Obrigatorio')
      })
      return (
         <div>
            <Formik
               initialValues={initialValues}
               validationSchema={EventoSchema}
               onSubmit={values => {
                  setTimeout(() => {
                     alert(JSON.stringify(values, null, 2))
                  }, 500)
               }}
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
                     <Field component="select" name="curso">
                        <option value='' defaultValue disabled>Cursos</option>
                        {listCursos.map(curso =>
                           <option key={curso.id} value={curso.nome}>{curso.nome}</option>)
                        }
                     </Field>
                     <ErrorMessage name="curso" component="div" />
                     <Field component="select" name="chancela">
                        <option value='' defaultValue disabled>Chancela</option>
                        {listChancelas.map(chancela =>
                           <option key={chancela.id} value={chancela.nome}>{chancela.nome}</option>)
                        }
                     </Field>
                     <ErrorMessage name="chancela" component="div" />
                  </div>
                  <button type="submit" disabled={isSubmitting}>Invite</button>
               </Form>
            </Formik>
         </div>
      );
   }
   render() {
      return this.myForm(this.props)
   }
}
