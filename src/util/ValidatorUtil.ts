const composeValidators = (...validators: any[]) => (value: any) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

const required = (value: any) => (value ? undefined : "必填")
const max = (max: number) => (value: any) => (value ? value.length > max ? `不能超过${max}个字符` : undefined : undefined);

export default {
    composeValidators,
    required,
    max,
}
