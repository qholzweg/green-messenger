import { useCallback } from "react";
import { useForm } from "../hooks/useForm";

export const Phone = ({onSubit: onSubmit}) => {
  const {form, handleChange} = useForm({phone: ''});
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (form.phone === '') return;
      const phone = form.phone.match(/\d+/g).join('')
      onSubmit(phone);
    }, [form, onSubmit]
  )
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="tel" pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}" name="phone" placeholder="Телефон абонента" value={form.phone} onChange={handleChange} className="px-3 py-2 border border-slate-300 rounded-full" />
      <button type="submit" className="px-3 py-2 border bg-green-400 text-white rounded-full">Отправить</button>
    </form>
  )
}