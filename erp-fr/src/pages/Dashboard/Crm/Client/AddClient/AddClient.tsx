import BreadCrumb from "../../../../../components/Shared/BreadCrump";
import Select from 'react-select'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useCallback, useEffect, useRef, useState } from "react";
import AddClientGroup from "../Template/AddClientGroup";
import { useAddClientMutation, useClientGroupsQuery } from "../../../../../Redux/Features/BaseApi";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

export type add_client_type = {
    group_id?: number,
    name: string,
    email?: string,
    phone: string,
    company?: string,
    country?: string,
    address?: string,
    post_code?: string,
    previous_due?: number,
    city?: string,
    refference?: string,
    description?: string,
    photo?: File
}

const bradCrumpList = [
    {
        name: '/ Client',
        rout: '#'
    },
    {
        name: '/ Add',
        rout: '#'
    }
]

const AddClient = () => {
    const [postClient, { isError, isLoading, isSuccess, data, error }] = useAddClientMutation();
    const { isLoading: groupLoading, data: groupdata } = useClientGroupsQuery({search : ''});
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<add_client_type>();

    const [photo, setPhoto] = useState<File | null>(null);

    const handleAddClient: SubmitHandler<add_client_type> = (data) => {
        const form = new FormData();

        for (const key in data) {
            const value = data[key as keyof add_client_type];

            if (value !== undefined && value !== null && value !== '') {
                form.append(key, value.toString());
            }
        }
        if (photo) {
            form.append('client_photo', photo);
        }
        postClient(form).unwrap();
    }

    const handleChangePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        setPhoto(file);
    }, []);

    const showModal = () => {
        modalRef?.current?.showModal();
    };
    const closeMOdal = () => {
        modalRef?.current?.close();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            reset();
        }
        if (isError) {
            const err = error as { data: { message: string } };
            toast.error(err?.data?.message);
        }
    }, [isSuccess, isError])

    return (
        <div>
            <BreadCrumb routList={bradCrumpList} />
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-2">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white text-lg">
                        Add Client
                    </h3>
                </div>
                <form className="p-6.5" onSubmit={handleSubmit(handleAddClient)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 items-start">
                        {/* // left side  */}
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="name" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Client Name
                                    <span className="text-red-500 text-base ml-1"> * </span>
                                    :
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', { required: { value: true, message: "Name is required" }, minLength: { value: 3, message: "Name must be at least 3 characters" } })}
                                    className={`w-full rounded-sm border px-2 py-1 dark:bg-boxdark col-span-2 outline-none text-black dark:text-white ${errors.name ? 'border-red-500' : 'border-stroke dark:border-strokedark focus:border-primary'}`}
                                />
                                <span className="col-span-1"></span>
                                {errors.name && <p className="text-red-500 text-sm col-span-2">{errors.name.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="email" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Email :
                                </label>
                                <input
                                    {...register("email", { pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'invalid email' } })}
                                    type="email"
                                    id="email"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                                <span className="col-span-1"></span>
                                {errors?.email && <p className="text-red-500 text-sm col-span-2">{errors?.email?.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="phone" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Phone
                                    :
                                </label>
                                <input
                                    {...register("phone", { minLength: { value: 11, message: "Phone must be at least 11 characters" } })}
                                    type="number"
                                    id="phone"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                                <span className="col-span-1"></span>
                                {errors.phone && <p className="text-red-500 text-sm col-span-2">{errors.phone.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="company" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Company :
                                </label>
                                <input
                                    {...register("company")}
                                    type="text"
                                    id="company"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="country" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Country :
                                </label>
                                <input
                                    {...register("country")}
                                    type="text"
                                    id="country"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="address" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Address :
                                </label>
                                <input
                                    {...register("address")}
                                    type="text"
                                    id="address"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="post_code" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Post Code :
                                </label>
                                <input
                                    {...register("post_code")}
                                    type="text"
                                    id="post_code"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                            </div>
                        </div>

                        {/* //right side  */}
                        <div>
                            {/* // grop selection */}
                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="group" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Group :
                                </label>
                                <div className="col-span-2 flex flex-row gap-x-2">
                                    <div className="w-full">
                                        <Controller name="group_id" control={control}
                                            render={({ field }) => (
                                                <Select
                                                    onChange={(val) => field.onChange(val?.value)}
                                                    options={
                                                        groupdata?.map((item) => {
                                                            return {
                                                                value: item.id,
                                                                label: item.name
                                                            }
                                                        })
                                                    }
                                                    isClearable={true}
                                                    isSearchable={true}
                                                    isLoading={groupLoading}
                                                    classNames={{
                                                        control: (state) =>
                                                            state.isFocused ? '!border-primary !shadow-none !bg-white dark:!bg-boxdark' : '!border-stroke dark:!border-strokedark !outline-none dark:!bg-boxdark dark:!text-white',

                                                        option: ({ isSelected }) =>
                                                            isSelected ? '!bg-primary' : 'hover:!bg-primary hover:!text-white dark:bg-box-dark'
                                                    }}
                                                />
                                            )}>

                                        </Controller>
                                    </div>

                                    <button type="button" onClick={showModal} className="px-3 py-1.5 bg-primary hover:opacity-70 duration-200 text-white rounded-sm text-sm">Creat</button>

                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="prev_due" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Previous Due
                                    :
                                </label>
                                <input
                                    {...register("previous_due", { min: { value: 0, message: "Previous due must be greater than 0" }, max: { value: 1000000000, message: "Previous due must be less than 1000000000" } })}
                                    type="number"

                                    id="prev_due"
                                    defaultValue={0}
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                                <span className="col-span-1"></span>
                                {errors.previous_due && <p className="text-red-500 text-sm col-span-2">{errors.previous_due.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="city" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    City
                                    :
                                </label>
                                <input
                                    {...register("city")}
                                    type="text"
                                    id="city"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="refference" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Refference
                                    :
                                </label>
                                <input
                                    {...register("refference")}
                                    type="text"
                                    id="refference"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="details" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Details
                                    :
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={3}
                                    id="details"
                                    className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                                <label htmlFor="photo" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                    Photo
                                    :
                                </label>
                                <input
                                    onChange={handleChangePhoto}
                                    type="file"
                                    id="photo"
                                    accept="image/*"
                                    className="col-span-2 w-full rounded-md border border-stroke px-2 py-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-0.5 file:px-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white "
                                />
                                <span className="col-span-1"></span>
                                {photo && <div>
                                    <img className="col-span-2 w-28 h-auto mt-5" src={URL.createObjectURL(photo)} />
                                </div>}
                            </div>

                        </div>

                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-3 py-1.5 bg-primary outline-none hover:opacity-70 duration-200 text-white rounded-sm text-base flex flex-row gap-x-2 items-center">
                            {isLoading && < ImSpinner2 className="text-lg text-white animate-spin" />}
                            <span>Save</span>
                        </button>
                    </div>
                </form>

                {/* -------------------Dailog------------------- */}
                <dialog ref={modalRef} className="modal">
                    <div className="modal-box !rounded dark:!bg-boxdark !z-20 !p-0">
                        <div className="flex justify-between items-center p-2.5 border-b border-stroke dark:border-strokedark">
                            <h3 className="text-base font-medium text-zinc-700 dark:text-gray">Add Client Group</h3>
                            <button type="button" onClick={closeMOdal} className="text-2xl hover:bg-slate-100 dark:hover:bg-boxdark-2 duration-150 py-0.5 px-2.5">&times;</button>
                        </div>
                        <div className="modal-body">
                            <AddClientGroup />
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

            </div>
        </div>
    );
};

export default AddClient;