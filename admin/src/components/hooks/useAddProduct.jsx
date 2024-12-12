import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";

const useAddProduct = (initialValues) => {

    const [values, setValues] = useState(initialValues)

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`http://localhost:4001/upload/add`, e.currentTarget)

        if (response.data.success) {
            setValues(initialValues)
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message)
        }
    }

    return {
        values,
        onChange,
        onSubmit,
    }
}

export default useAddProduct