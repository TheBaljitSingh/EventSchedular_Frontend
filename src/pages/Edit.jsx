import { Form, redirect, useLoaderData } from "react-router-dom"
import transform from "../methods/transform";
import { toast } from "react-toastify";

export async function action({request,params}){
    const formData = await request.formData();
    formData.append('id', params.jobId); 

    const formEntries = Object.fromEntries(formData);
    const updates = transform(formEntries);
    
    const url = `/api${params.jobId}`
    const response = await fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
    })
    if(!response.ok){
        console.error("Event Not Updated");
        toast.error("Event Edit Failed")
        return redirect(`/eventsPage/${params.jobId}`);
    }
    toast.success("Event Edited Successfully")
    console.log("Event Updated Successfully");
    // return redirect('/');
    return redirect(`/eventsPage/${params.jobId}`);
}

export default function Edit(){
    const job = useLoaderData();

    return (
        <>
        <section className="bg-indigo-50">
                <div className="container m-auto max-w-2xl py-24">
                    <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                        <Form  method="post">
                            <h2 className="text-3xl text-center font-semibold mb-6">Add Event</h2>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Event Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="border rounded w-full py-2 px-3 mb-2"
                                    defaultValue={job.name}
                                />
                            </div>

                            <div className="mb-4">
                                <label  className="block text-gray-700 font-bold mb-2">Location</label>
                                <input
                                    required
                                    type="text"
                                    name="location"
                                    id="location"
                                    className="border rounded w-full py-2 px-3 mb-2"
                                    defaultValue={job.location}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="4"
                                    className="border rounded w-full py-2 px-3"
                                    placeholder="Add event details, activities, etc"
                                    defaultValue={job.description}
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type</label>
                                <input
                                    required
                                    type="text"
                                    name="type"
                                    id="type"
                                    className="border rounded w-full py-2 px-3 mb-2"
                                    defaultValue={job.type}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="department" className="block text-gray-700 font-bold mb-2">Department</label>
                                <input
                                    required
                                    type="text"
                                    name="department"
                                    id="department"
                                    className="border rounded w-full py-2 px-3 mb-2"
                                    defaultValue={job.department}
                                />
                            </div>

                            <div className="mb-4 flex gap-2">
                                <div className="flex-1">
                                    <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time</label>
                                    <input
                                        required
                                        type="time"
                                        name="time"
                                        id="time"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value="00:00"
                                        defaultValue={job.time}
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
                                    <input
                                        required
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="border rounded w-full py-2 px-3"
                                        defaultValue={job.date}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                                <input
                                    required
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="border rounded w-full py-2 px-3 mb-2"
                                    defaultValue={job.price}
                                />
                            </div>

                            <hr className="my-6" />

                            <h3 className="text-2xl mb-5">Organiser Info</h3>

                            <div className="mb-4">
                                <label htmlFor="organiserName" className="block text-gray-700 font-bold mb-2">Organiser Name</label>
                                <input
                                    required
                                    type="text"
                                    name="organiserName"
                                    id="organiserName"
                                    className="border rounded w-full py-2 px-3 mb-2"
                                    defaultValue={job.organiserName}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="organiserEmail" className="block text-gray-700 font-bold mb-2">Organiser Email</label>
                                <input
                                    required
                                    type="email"
                                    name="organiserEmail"
                                    id="organiserEmail"
                                    className="border rounded w-full py-2 px-3 mb-2"
                                    defaultValue={job.organiserEmail}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="organiserDepartment" className="block text-gray-700 font-bold mb-2">Organiser Department</label>
                                <input
                                    required
                                    type="text"
                                    name="organiserDepartment"
                                    id="organiserDepartment"
                                    className="border rounded w-full py-2 px-3 mb-2"
                                    defaultValue={job.organiserDepartment}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
    </>
    )
}