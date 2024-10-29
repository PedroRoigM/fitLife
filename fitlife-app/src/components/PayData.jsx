import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function PayData({ handleData }) {
    const formik = useFormik({
        initialValues: {
            payment: "",
            cardnumber: "",
            expiryDate: ""
        },
        validationSchema: Yup.object({
            payment: Yup.string().required('Método de pago es obligatorio'),
            cardnumber: Yup.string()
                .matches(/^[0-9]{16}$/, "Número de tarjeta inválido (16 dígitos)")
                .nullable(), // Permitir nulo
            expiryDate: Yup.string()
                .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/AA")
                .nullable()
        }),
        onSubmit: values => {
            console.log(values); // Guarda o envía los datos
            handleData(values); // Llamada a handleData
        }
    });


    // Limpia los valores de los campos adicionales cuando cambia el método de pago
    const handlePaymentChange = (e) => {
        const { value } = e.target;
        formik.setFieldValue("payment", value);
        if (value !== "card") {
            formik.setFieldValue("cardnumber", "");
            formik.setFieldValue("expiryDate", "");
        }
    };

    return (
        <div>
            <h3>Datos de pago</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="payment">Método de Pago</label>
                    <select
                        name="payment"
                        id="payment"
                        className="gym-select"
                        value={formik.values.payment}
                        onChange={handlePaymentChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="" label="Selecciona un método de pago" />
                        <option value="card" label="Tarjeta" />
                        <option value="paypal" label="PayPal" />
                    </select>
                    {formik.touched.payment && formik.errors.payment ? (
                        <div className="error">{formik.errors.payment}</div>
                    ) : null}
                </div>

                {/* Renderizado condicional de los campos adicionales si la opción es "Tarjeta" */}
                {formik.values.payment === 'card' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="cardnumber">Número de Tarjeta</label>
                            <input
                                type="text"
                                name="cardnumber"
                                id="cardnumber"
                                placeholder="Número de tarjeta"
                                {...formik.getFieldProps('cardnumber')}
                            />
                            {formik.touched.cardnumber && formik.errors.cardnumber ? (
                                <div className="error">{formik.errors.cardnumber}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Fecha de Vencimiento</label>
                            <input
                                type="text"
                                name="expiryDate"
                                id="expiryDate"
                                placeholder="MM/AA"
                                {...formik.getFieldProps('expiryDate')}
                            />
                            {formik.touched.expiryDate && formik.errors.expiryDate ? (
                                <div className="error">{formik.errors.expiryDate}</div>
                            ) : null}
                        </div>
                    </>
                )}
                <button type="submit" className="gym-button">Enviar</button>
            </form>
        </div>
    );
}
