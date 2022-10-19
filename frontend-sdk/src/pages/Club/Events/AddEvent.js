import React, {useState} from "react";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import Heading from "../../../components/Heading";
import Inputfield from "../../../components/TextInput";
import TextArea from "../../../components/TextArea";

const AddEvent = () => {
    const [date, setDate] = useState("");
    const [eventName, setEventName] = useState("");
    const [fromDate, setfromDate] = useState("");
    const [toDate, settoDate] = useState("");
    const [venue, setvenue] = useState("");
    const [fromTime, setfromTime] = useState("");
    const [toTime, settoTime] = useState("");
    const [count, setcount] = useState("");
    const [guest, setguest] = useState("");
    const [eventBrief, setEventBrief] = useState("");
    const [eventDetailed, setEventDetailed] = useState("");
    const [thumb, setThumb] = useState(null);
    const [file, setFile] = useState(null);

    return (
        <section className="px-8 py-8 w-full">
            <Heading>Content for website</Heading>
            <div className="mt-8 w-full lg:pr-[20%] h-[calc(100vh-20rem)] overflow-y-auto">
                <div className="flex items-center w-full space-x-4">
                    <Inputfield
                        valueState={[date, setDate]}
                        title="Date"
                        placeholder="Enter date"
                    />
                    <Inputfield
                        valueState={[eventName, setEventName]}
                        title="Event"
                        placeholder="Enter the event name"
                    />
                </div>
                <div className="flex items-center w-full space-x-4 mt-4">
                    <Inputfield
                        valueState={[fromDate, setfromDate]}
                        title="From Date"
                        placeholder="Enter from date"
                    />
                    <Inputfield
                        valueState={[toDate, settoDate]}
                        title="To Date"
                        placeholder="Enter to date"
                    />
                </div>
                <div className="flex items-center w-full space-x-4 mt-4">
                    <Inputfield
                        valueState={[fromTime, setfromTime]}
                        title="From Time"
                        placeholder="Eg. 4:30 PM"
                    />
                    <Inputfield
                        valueState={[toTime, settoTime]}
                        title="To Time"
                        placeholder="Eg. 6:00 PM"
                    />
                    <Inputfield
                        valueState={[venue, setvenue]}
                        title="Venue"
                        placeholder="Eg. J203"
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
                        fileState={[thumb, setThumb]}/>
                    <FileUpload
                        title="Images"
                        fileState={[file, setFile]}/>
                </div>
                <div className="flex items-center space-x-4 mt-8 w-1/2">
                    <Button className="w-3/4" text="Submit"/>
                </div>
            </div>
        </section>
    );
};

export default AddEvent;
