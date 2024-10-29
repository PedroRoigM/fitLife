import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function PersonalData({ handleData }) {
    const formik = useFormik({
        initialValues: {
            name: "", surname: "", email: "",
            direccion: "", city: "", codigopostal: "", pais: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            surname: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            direccion: Yup.string()
                .required('Required'),
            city: Yup.string()
                .required('Required'),
            codigopostal: Yup.string()
                .matches(/^\d{5}$/, 'Must be 5 digits')
                .required('Required'),
            pais: Yup.string().required('Required').typeError('Invalid'),
        }),
        onSubmit: values => {
            handleDataSubmission(values);
        }
    });
    const handleDataSubmission = (values) => {
        handleData(values);
    }
    return (<div>
        <h2>Datos Personales</h2>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Nombre'

                    {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name ? (
                    <div className='error'>{formik.errors.name}</div>
                ) : null}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="surname"
                    id="surname"
                    placeholder='Apellido'

                    {...formik.getFieldProps('surname')} />
                {formik.touched.surname && formik.errors.surname ? (
                    <div className='error'>{formik.errors.surname}</div>
                ) : null}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder='Email'

                    {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div className='error'>{formik.errors.email}</div>
                ) : null}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="direccion"
                    id="direccion"
                    placeholder='Direccion'

                    {...formik.getFieldProps('direccion')} />
                {formik.touched.direccion && formik.errors.direccion ? (
                    <div className='error'>{formik.errors.direccion}</div>
                ) : null}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder='Ciudad'

                    {...formik.getFieldProps('city')} />
                {formik.touched.city && formik.errors.city ? (
                    <div className='error'>{formik.errors.city}</div>
                ) : null}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="codigopostal"
                    id="codigopostal"
                    placeholder='Codigo Postal'

                    {...formik.getFieldProps('codigopostal')} />
                {formik.touched.codigopostal && formik.errors.codigopostal ? (
                    <div className='error'>{formik.errors.codigopostal}</div>
                ) : null}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="pais"
                    id="pais"
                    placeholder='Pais'

                    {...formik.getFieldProps('pais')} />
                {formik.touched.pais && formik.errors.pais ? (
                    <div className='error'>{formik.errors.pais}</div>
                ) : null}
            </div>
            <button type="submit">Crear perfil</button>
        </form>
    </div>)
}
