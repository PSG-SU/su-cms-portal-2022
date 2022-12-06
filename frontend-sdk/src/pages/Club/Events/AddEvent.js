import React, { useState } from "react";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import TextArea from "../../../components/TextArea";
import DateInput from "../../../components/DateInput";

const AddEvent = () => {
    const [eventName, setEventName] = useState("");
    const [venue, setvenue] = useState("");
    const [count, setcount] = useState("");
    const [guest, setguest] = useState("");
    const [eventBrief, setEventBrief] = useState("");
    const [eventDetailed, setEventDetailed] = useState("");
    const [thumb, setThumb] = useState(null);
    const [file, setFile] = useState(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const currentDate = Date().slice(4, 15);

    return (
        <section className="px-8 py-8 w-full">
            <Heading event>Content for website</Heading>
            <label className=" text-blue text-base space-x-4">Date: {currentDate}</label>
            <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-y-auto">
                <div className="flex items-center w-full space-x-4">
                    <Inputfield
                        valueState={[eventName, setEventName]}
                        title="Event"
                        placeholder="Enter the event name"
                    />
                    <DateInput
                        startTitle="Start Date"
                        startState={[startDate, setStartDate]}
                        endTitle="End Date"
                        endState={[endDate, setEndDate]}
                        range
                    />
                </div>
                <div className="flex items-center w-full space-x-4 mt-4">
                    <Inputfield
                        valueState={[count, setcount]}
                        title="Participant Count"
                        placeholder="Eg. 50"
                    />
                    <Inputfield
                        valueState={[guest, setguest]}
                        title="Chief Guest"
                        placeholder="Eg. Mr. Abc"
                    />
                    <Inputfield
                        valueState={[venue, setvenue]}
                        title="Venue"
                        placeholder="Eg. J203"
                    />
                </div>
                <div className="flex items-center w-full space-x-4 mt-4">
                    <TextArea
                        title="Event Description (Brief)"
                        placeholder="The content entered here will be shown as a description for thumbnail in events page"
                        valueState={[eventBrief, setEventBrief]}
                    />
                </div>
                <div className="flex items-center w-full space-x-4 mt-4">
                    <TextArea
                        title="Event Description (Detailed)"
                        placeholder="The content entered here will be displayed on the individual events page"
                        valueState={[eventDetailed, setEventDetailed]}
                    />
                </div>
                <div className="flex items-center w-full space-x-4 mt-4">
                    <FileUpload
                        title="Thumbnail Image"
                        fileState={[thumb, setThumb]} />
                    <FileUpload
                        title="Images"
                        fileState={[file, setFile]} />
                </div>
                <div className="flex items-center space-x-4 mt-8 w-1/2">
                    <Button className="w-3/4" text="Submit" />
                </div>
            </div>
        </section>
    );
};

export default AddEvent;
