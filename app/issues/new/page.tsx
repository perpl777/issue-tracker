"use client";

import React from 'react';
import { useMemo } from "react";

// libs for md editor
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";

import { useForm, Controller } from 'react-hook-form';


interface IssueForm {
    title: string,
    description: string
}

    const NewIssuePage = () => {
    const {register, control, handleSubmit} = useForm<IssueForm>();

    const mdeOptions = useMemo(() => {
        return {
        autofocus: true,
        spellChecker: false,
        };
    }, []);

    return (
        <form
            className="max-w-xl space-y-5 flex flex-col gap-y-5"
            onSubmit={handleSubmit((data) => console.log(data))}
        >
        <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="input input-bordered w-full"
        />
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
        <button type="submit" className="btn btn-primary max-w-fit">Submit New Issue</button>
        </form>
    );
}

export default NewIssuePage