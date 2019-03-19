import Form from "./Form";
import FormItem from "./FormItem";
import SmartForm from "./SmartForm";
import validators, { Collector } from "./validators";

Form.Item = FormItem;
Form.validators = validators;
Form.Collector = Collector;
Form.SmartForm = SmartForm;

export default Form;

export { FormItem, Collector };
