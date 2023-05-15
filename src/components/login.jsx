import { useCallback } from "react";
import { useForm } from "../hooks/useForm";

export const Login = ({onSubit: onSubmit}) => {
  const {form, handleChange} = useForm({idInstance: '', apiTokenInstance: ''});
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(form);
    }, [form, onSubmit]
  )
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p>Введите реквизиты вашей записи в <a className="text-green-400" href="https://green-api.com/docs/before-start/#cabinet">green-api</a></p>
      <input type="text" name="idInstance" placeholder="idInstance" value={form.idInstance} onChange={handleChange} className="px-3 py-2 border border-slate-300 rounded-full" />
      <input type="password" name="apiTokenInstance" placeholder="apiTokenInstance" value={form.apiTokenInstance} onChange={handleChange} className="px-3 py-2 border border-slate-300 rounded-full" />
      <button type="submit"  className="px-3 py-2 border bg-green-400 text-white rounded-full">Отправить</button>
    </form>
  )
}