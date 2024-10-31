import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function FitData({ handleData }) {
    const formik = useFormik({
        initialValues: {
            training: "", goals: "", disponibility: ""
        },
        validationSchema: Yup.object({
            training: Yup.string().required('Required').typeError('Invalid'),
            goals: Yup.string().required('Required').typeError('Invalid'),
            disponibility: Yup.string().required('Required').typeError('Invalid'),
        }),
        onSubmit: values => {
            handleDataSubmission(values);
            console.log(values);
        }
    });
    const handleDataSubmission = (values) => {
        handleData(values);

    }
    return (
        <div>
            <h3>Fit Data</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="training">Tipo de Entrenamiento</label>
                    <select
                        name="training"
                        id="training"
                        className="gym-select"
                        {...formik.getFieldProps('training')}
                    >
                        <option value="" label="Selecciona tu tipo de entrenamiento deseado" />
                        <option value="pesas" label="Levantamiento de pesas" />
                        <option value="anaerobico" label="Aeróbicos " />
                        <option value="mixto" label="Mixto" />
                    </select>
                    {formik.touched.training && formik.errors.training ? (
                        <div className="error">{formik.errors.training}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor='goals'>Objetivos</label>
                    <select
                        name="goals"
                        id="goals"
                        {...formik.getFieldProps('goals')}
                    >
                        <option value="" label="Selecciona tus objetivos" />
                        <option value="perder" label="Perder peso" />
                        <option value="tonificar" label="Tonificar" />
                        <option value="ganar" label="Ganar masa muscular" />
                    </select>
                    {formik.touched.goals && formik.errors.goals ? (
                        <div className='error'>{formik.errors.goals}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="disponibility">Tipo de Entrenamiento</label>
                    <select
                        name="disponibility"
                        id="disponibility"
                        className="gym-select"
                        {...formik.getFieldProps('disponibility')}
                    >
                        <option value="" label="Selecciona tu frecuencia de entrenamiento" />
                        <option value="1-3" label="1 a 3 días a la semana" />
                        <option value="3-5" label="3 a 5 días a la semana" />
                        <option value="6" label="6 días a la semana" />
                    </select>
                    {formik.touched.disponibility && formik.errors.disponibility ? (
                        <div className="error">{formik.errors.disponibility}</div>
                    ) : null}
                </div>
                <button type="submit">Siguiente</button>
            </form>
        </div>
    )
};