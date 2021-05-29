export default function validateInfo(values) {
    let errors = {};

    if (!values.startDate) {
        errors.startDate = "startDate required";
    }
    if (!values.endDate) {
        errors.endDate = "startDate required";
    }

    return errors;
}