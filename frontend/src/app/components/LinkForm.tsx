import { FormEventHandler } from "react";

type LinkFormProps = {
    onSubmit: FormEventHandler;
}

const LinkForm = ({ onSubmit }: LinkFormProps) => {
    return (
        <form onSubmit={onSubmit}>
            <input name="url" type="text" required/>
            <input type="submit" />
        </form>
    );
};

export default LinkForm;