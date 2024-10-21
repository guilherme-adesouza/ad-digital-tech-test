import styles from "./link-form.module.css";
import { FormEventHandler } from "react";

type LinkFormProps = {
    onSubmit: FormEventHandler;
}

const LinkForm = ({ onSubmit }: LinkFormProps) => {
    return (
        <form className={styles.linkForm} onSubmit={onSubmit}>
            <input name="url" type="text" placeholder="Digite uma URL do Youtube aqui"required/>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default LinkForm;