import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import jQuery from 'jquery';
import * as Config from './Config'
import axios from 'axios'

export default class FormikEx4 extends Component {
   constructor(props) {
      super(props)
      this.state = {
         curso: [],
         chancelas: [],
         cidade: "",
         nome: "",
         periodoDeRealizacao: "",
         texto: "",
         dataDoCertificado: "",
         ano: ""
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

   getEvent(id) {
      jQuery.ajax({
         method: 'GET',
         url: Config.URL + 'api/getEventoById/?eventoId=' + id,
         success: (event) => {
            this.setState({
               nome: event.nome,
               cidade: event.cidade,
               periodoDeRealizacao: event.periodoDeRealizacao,
               texto: event.texto,
               dataDoCertificado: event.dataDoCertificado,
               ano: event.ano
            })
         },
         statusCode: {
            500: function () {
               alert(":(");
            }
         }
      }
      )
   }

   postEvent(evento) {
      console.log(`2 - ${evento}`)
      axios.post(Config.URL_API + 'v1/evento/', evento)
         .then(resp => console.log("oii"))
         .catch(function (error) {
            console.log(error);
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
      let listChancelas = this.state.chancelas;
      const { nome, cidade, periodoDeRealizacao, texto, dataDoCertificado, ano } = this.state

      const { values, errors, touched, handleChange, isSubmitting } = props
      const initialValues = {
         texto: texto === "" ? "" : texto,
         nome: nome === "" ? "" : nome,
         periodoDeRealizacao: periodoDeRealizacao === "" ? "" : periodoDeRealizacao,
         cidade: cidade === "" ? "" : cidade,
         dataDoCertificado: dataDoCertificado === "" ? "" : dataDoCertificado,
         ano: ano === "" ? "" : ano,
         curso: "",
         chancelas: "",
         atividades: null,
         descricao: "null",
      }
      const EventoSchema = Yup.object().shape({
         texto: Yup.string().required('Obrigatorio'),
         nome: Yup.string().required('Obrigatorio'),
         periodoDeRealizacao: Yup.string().required('Obrigatorio'),
         cidade: Yup.string().required('Obrigatorio'),
         dataDoCertificado: Yup.string("Use uma data valida Ex: 01/01/2001").required('Obrigatorio'),
         ano: Yup.string().required('Obrigatorio'),
         curso: Yup.string().required('Obrigatorio'),
         chancelas: Yup.string().required('Obrigatorio')
      })
      return (
         <div>
            <Formik
               initialValues={initialValues}
               validationSchema={EventoSchema}
               onSubmit={values => {
                  console.log(JSON.stringify(values, null, 2))
                  this.postEvent(values)
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
                           <option key={curso.id} value={curso.id}>{curso.nome}</option>)
                        }
                     </Field>
                     <ErrorMessage name="curso" component="div" />
                     <Field component="select" name="chancelas">
                        <option value='' defaultValue disabled>Chancela</option>
                        {listChancelas.map(chancela =>
                           <option key={chancela.id} value={chancela.id}>{chancela.nome}</option>)
                        }
                     </Field>
                     <ErrorMessage name="chancelas" component="div" />
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
