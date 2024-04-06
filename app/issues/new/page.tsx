"use client";

import React, { useMemo, useState } from 'react';

// libs for md editor
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import axios from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { IssueForm } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/navbar/errorMessage/errorMessage';


const NewIssuePage = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    const [error, setError] = useState('');

    const mdeOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        };
    }, []);

    const router = useRouter();

    return (
        <form
            className="max-w-xl space-y-5 flex flex-col gap-y-5"
            onSubmit={handleSubmit(async (data)  => {
                try {
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                }
                catch(error) {
                    setError('Unexpected error');
                }
            })}
        >
            {error &&
                <div role="alert" className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            }

            <input
                type="text"
                placeholder="Title"
                {...register("title")}
                className="input input-bordered w-full"
            />
            {/** сообщение для ошибки в title **/}
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
        
            <Controller
                name="description"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                <SimpleMDE
                    className="textarea textarea-bordered"
                    placeholder="Description"
                    options={mdeOptions}
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value}
                ></SimpleMDE>
                )}
            />
            {/** сообщение для ошибки в description **/}
            <ErrorMessage children={errors.description?.message} />

            <button type="submit" className="btn btn-primary max-w-fit">Submit New Issue</button>
        </form>
    );
}

export default NewIssuePage