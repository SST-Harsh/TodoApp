import {useForm} from 'react-hook-form';
export default function Form(){
     const { register, handleSubmit, formState } = useForm();
        const onSubmit=(data)=>{
            console.log(data)
        }
    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' {...register('name', {required: true})} placeholder='Name' className='border p-2 rounded mb-2'/>
            <input type='email' {...register('email', {required: true})} placeholder='Email' className='border p-2 rounded mb-2'/>
            <button type='submit' className='bg-blue-500 text-white p-2 rounded'>Submit</button>
        </form>
        </>
    )
}