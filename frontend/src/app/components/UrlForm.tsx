import { FormEventHandler } from "react";

type UrlFormProps = {
    onSubmit: FormEventHandler;
}

const UrlForm = ({ onSubmit }: UrlFormProps) => {
    return (
        <form onSubmit={onSubmit}>
            <input name="url" type="text" required/>
            <input type="submit" />
        </form>
    );
};

export default UrlForm;